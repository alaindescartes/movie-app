import React, { useEffect, useState } from "react";
import styles from "./Movie.module.css";

function Movie({ cover, name, genre, rating, dateReleased }) {
  const [date, setDate] = useState("N/A");
  useEffect(() => {
    setDate(dateReleased || "N/A");
  }, [dateReleased]);
  return (
    <div className={styles.movieCard}>
      <img src={cover} alt={name} className={styles.movieImage} />
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{name}</h3>
        <p className={styles.movieGenre}> {genre}</p>
        <p className={styles.movieRating}>Rating: {rating}</p>
        <p className={styles.movieRating}>Date: {date}</p>
      </div>
    </div>
  );
}

export default Movie;
