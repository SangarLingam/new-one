import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true, default: "Movie" }, // can be Movie, TV Show, or custom text
    customType: { type: String }, // for 'Other' type custom entry
    image: { type: String }, // can store base64 (upload) or URL
    imageType: { type: String, enum: ["url", "upload"], default: "url" },
    director: { type: String },
    year: { type: Number },
    duration: { type: String }, // e.g. "2h 30m" or "10 episodes"
    episodes: { type: Number }, // only used for TV shows
    budget: { type: Number }, // optional
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
