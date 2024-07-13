import React from "react";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  return (
    <div>
      {movies && movies.length > 0
        ? movies.slice(0, 5).map((movie) => (
            <div key={movie.id} className={styles.movieItem}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.movieImage}
              />
              <h5 className={styles.movieTitle}>{movie.title}</h5>
            </div>
          ))
        : null}
    </div>
  );
}

export default MovieList;
