import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import api from "../../config/axios";
import styles from "./MovieByGenre.module.css";

const genres = [
  { name: "Action", path: "/genres/28", id: 28 },
  { name: "Adventure", path: "/genres/12", id: 12 },
  { name: "Sci-fi", path: "/genres/878", id: 878 },
  { name: "Romance", path: "/genres/10749", id: 10749 },
  { name: "Western", path: "/genres/37", id: 37 },
  { name: "Documentary", path: "/genres/99", id: 99 },
];

function MovieByGenre() {
  const response = useLoaderData();
  let movies = response ? response.results : [];
  const { genreId } = useParams();

  const findMovieGenreName = () => {
    let genre = genres.find((genre) => genre.id === Number.parseInt(genreId));
    return genre.name;
  };
  const genreName = findMovieGenreName();
  return (
    <>
      <h1 style={{ textAlign: "center", margin: ".5rem" }}>{genreName}</h1>
      <div className={styles.gridContainer}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieItem}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.movieImage}
            />
            <h2 className={styles.movieTitle}>{movie.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

// Function to fetch movies by genre using Axios
export async function fetchMoviesByGenre(genreId) {
  try {
    const url = `/3/discover/movie?with_genres=${genreId}`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching movies by genre:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error if you need to handle it upstream as well
  }
}

export default MovieByGenre;
