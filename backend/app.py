from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pymongo import MongoClient
from PIL import Image
import io
import cv2
import numpy as np
import tensorflow as tf
import base64

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Update URI as needed
db = client["image_database"]  # Replace with your DB name
collection = db["image_records"]  # Replace with your collection name

# Load the generator model
generator = tf.keras.models.load_model("c:/Users/vashi/Desktop/Chrome Git/generator_epoch_26.keras")

def load_image_for_prediction(image_bytes):
    # Read image from bytes
    image = Image.open(io.BytesIO(image_bytes))
    image = image.convert('RGB')  # Convert to RGB if not already
    image = np.array(image)
    image = cv2.resize(image, (256, 256))
    image = (image / 127.5) - 1  # Normalize to [-1, 1]
    return np.expand_dims(image, axis=0).astype(np.float32)

def process_image_with_model(image_array):
    # Predict using the model
    predicted_image = generator(image_array, training=False)
    return (predicted_image[0] + 1) / 2  # Rescale to [0, 1] for display

@app.route('/api/upload', methods=['POST'])
def process_image():
    # Check if the request contains a file
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    image_bytes = file.read()

    # Load and process the image
    sketch_image = load_image_for_prediction(image_bytes)
    predicted_image = process_image_with_model(sketch_image)

    # Convert processed image to PIL format and send it back as a response
    predicted_image = (predicted_image * 255).numpy().astype(np.uint8)
    predicted_image_pil = Image.fromarray(predicted_image)

    # Save sketch and generated images as Base64 strings
    sketch_image_b64 = base64.b64encode(image_bytes).decode("utf-8")
    img_byte_arr = io.BytesIO()
    predicted_image_pil.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    generated_image_b64 = base64.b64encode(img_byte_arr.read()).decode("utf-8")

    # Store in MongoDB
    record = {
        "sketch_image": sketch_image_b64,
        "generated_image": generated_image_b64,
    }
    collection.insert_one(record)

    # Send back the generated image
    img_byte_arr.seek(0)  # Reset stream for response
    return send_file(img_byte_arr, mimetype='image/png')

@app.route('/api/get_images', methods=['GET'])
def get_images():
    # Fetch all image records from MongoDB
    records = list(collection.find({}, {"_id": 0}))
    return jsonify(records), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
