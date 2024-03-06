import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal/index.js";

export default function Row({ isLargeRow, title, id, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    console.log("request", request);
    setMovies(request.data.results);
    return request;
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  return (
    <section className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div className="sliderarrow-left">
          <div id={id} className="row-posters">
            {movies.map((movie) => (
              <img
                key={movie.id}
                className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path} `}
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            ))}
          </div>
          <div className="slider-arrow-right">
            <span
              className="arrow"
              onClick={() => {
                document.getElementById(id).scrollLeft += window.innerWidth - 80;
              }}
            >
              {">"}
            </span>
          </div>
        </div>
      </div>

      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}
