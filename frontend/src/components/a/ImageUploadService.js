// /components/ImageUploadPage/ImageUploadService.js
import axios from "axios";

export const fetchImages = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/cloudinary/get-all-img");
    return response.data.images;
  } catch (error) {
    console.error("Error fetching images", error);
    throw error;
  }
};
