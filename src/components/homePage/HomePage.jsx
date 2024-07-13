import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { Carousel } from "react-bootstrap";
import { json, useLoaderData } from "react-router-dom";
import api from "../../config/axios";
import Movie from "../movieContainer/Movie";
import styles from "./HomePage.module.css";

function HomePage() {
  const { upcomingMovies, trendingMovies, genreArray } = useLoaderData();

  function getGenreNamesById(genreIds, genres) {
    return genreIds.map((id) => {
      const foundGenre = genres.find((genre) => genre.id === id);
      return foundGenre ? foundGenre.name : "Unknown Genre";
    });
  }

  return (
    <div className={styles.container}>
      <Carousel style={{ backgroundColor: "black" }}>
        {upcomingMovies.map((movie) => (
          <Carousel.Item key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
              style={{
                width: "100%",
                height: "600px",
                objectFit: "contain",
                backgroundSize: "center",
                margin: "5rem .5rem",
              }}
            />
            <Carousel.Caption>
              <h3>{movie.original_title}</h3>
              <p style={{ fontWeight: "bolder" }}> {movie.release_date}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className={styles.upcoming}>
        <h1>Trending Movies</h1>
        <span>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        {trendingMovies.map((movie) => (
          <Movie
            cover={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            name={movie.original_title}
            rating={movie.vote_average}
            genre={getGenreNamesById(movie.genre_ids, genreArray).join()}
            dateReleased={movie.release_date}
            key={movie.id}
          />
        ))}
        <span>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>
    </div>
  );
}

export const loader = async () => {
  try {
    // Performing all API requests concurrently
    const [upcomingMovieRes, trendingMovieRes, genreRes] = await Promise.all([
      api.get("/3/movie/upcoming"),
      api.get("/3/movie/popular"),
      api.get("/3/genre/movie/list"),
    ]);

    // Preparing response object
    const response = {
      upcomingMovies: upcomingMovieRes.data.results,
      trendingMovies: trendingMovieRes.data.results,
      genreArray: genreRes.data.genres,
    };

    return json(response, { status: 200 });
  } catch (error) {
    // Logging the error to the server console
    console.error("Failed to fetch data:", error);

    // Preparing error response
    return json(
      { message: "oops, Failed to load data!!!", error: error.message },
      {
        status: error.response?.status || 500,
      }
    );
  }
};

export default HomePage;
