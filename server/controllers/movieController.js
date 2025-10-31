import Movie from "../models/Movie.js";

// ✅ Get all movies (any logged-in user)
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movies", error: error.message });
  }
};

// ✅ Create a new movie (admin only)
export const createMovie = async (req, res) => {
  try {
    const {
      name,
      type,
      customType,
      image,
      imageType,
      director,
      year,
      duration,
      episodes,
      budget,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Movie name is required" });
    }

    const movie = new Movie({
      name,
      type,
      customType: type === "Other" ? customType : "",
      image,
      imageType,
      director,
      year,
      duration,
      episodes: type === "TV Show" ? episodes : null,
      budget,
    });

    await movie.save();
    res.status(201).json({
      message: "Movie created successfully",
      movie,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating movie", error: error.message });
  }
};

// ✅ Update a movie
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Movie updated successfully",
      movie: updated,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating movie", error: error.message });
  }
};

// ✅ Delete a movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting movie", error: error.message });
  }
};
