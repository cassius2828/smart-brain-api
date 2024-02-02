import Clarifai from "clarifai";
import dotenv from "dotenv";

dotenv.config();
const app = new Clarifai.App({
  // You must add your own API key here from Clarifai
  apiKey: process.env.API_KEY,
});

export const handleApiCall = (req, res) => {
  const { input } = req.body;
  app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then((response) => {
  res.send(response)
  });

};
