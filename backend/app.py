import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import numpy as np
import tensorflow as tf

# Suppress TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Suppress INFO and WARNING messages
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN custom operations

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your model (update the path to your model)
model = tf.keras.models.load_model("C:/Users/palak/OneDrive/Desktop/Jupyter Notebook/pix2pix_generator3.h5")

def process_image(image):
    # Resize and preprocess the image as required by the model
    image = image.resize((256, 256))  # Adjust the size to match model's input
    img_array = np.array(image) / 255.0  # Normalize if required
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    generated_img_array = model.predict(img_array)[0]  # Model's output

    # Convert output to an image format
    generated_img_array = (generated_img_array * 255).astype(np.uint8)  # Adjust for RGB
    return Image.fromarray(generated_img_array)

@app.route('/api/generate-image', methods=['POST'])
def generate_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    # Read image from the request
    file = request.files['image']
    input_image = Image.open(file)

    # Process the image with the model
    generated_image = process_image(input_image)

    # Save to an in-memory buffer to send as response
    buffer = BytesIO()
    generated_image.save(buffer, format="PNG")
    buffer.seek(0)

    # Return the generated image
    return send_file(buffer, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
