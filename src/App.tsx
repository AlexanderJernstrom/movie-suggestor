import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Movie from "./Movie";
import Textbox from "./Textbox";
import dotenv from "dotenv";
dotenv.config();

interface MovieSchema {
  title: string;
  vote_average: Number;
  backdrop_path: string;
  overview: string;
  release_date: string;
}

const App: React.FC = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchTerm, setSearchterm] = useState("");
  const [movie, setMovie] = useState<MovieSchema>({
    title: "",
    vote_average: 0,
    backdrop_path: "",
    overview: "",
    release_date: ""
  });

  const changeOption = (e: React.FormEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.currentTarget.value.toString());
  };

  const changeText = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchterm(e.currentTarget.value);
  };

  const getMovie = async () => {
    var response;
    if (searchTerm.length > 0) {
      response = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
      );
      if (response.data.results.length === 0) {
        alert(
          `Actor with the name of ${searchTerm} not found, please try again`
        );
      } else {
        axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${selectedGenre}&with_cast=${response.data.results[0].id}&sort_by=popularity.desc`
          )
          .then(res => {
            const randomNumber = Math.floor(
              Math.random() * res.data.results.length
            );
            setMovie(res.data.results[randomNumber]);
          });

        axios
          .get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${selectedGenre}&sort_by=popularity.desc`
          )
          .then(res => {
            const randomNumber = Math.floor(
              Math.random() * res.data.results.length
            );
            setMovie(res.data.results[randomNumber]);
          });
      }
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-EN`
      )
      .then(res => {
        setGenres(res.data.genres);
        setSelectedGenre(res.data.genres[0].id.toString());
      });
  }, []);
  return (
    <div className="App">
      <h2>What should I watch?</h2>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            width: "40%",
            justifyContent: "space-evenly"
          }}
        >
          <select onChange={e => changeOption(e)} className="select">
            {genres.map((genre: { name: string; id: number }) => {
              return (
                <option
                  style={{ border: "1px solid", borderColor: "grey" }}
                  value={genre.id.toString()}
                >
                  {genre.name}
                </option>
              );
            })}
          </select>
          <Textbox placeholder="search for actor" onChange={changeText} />
          <button className="search-button" onClick={() => getMovie()}>
            Get me a movie
          </button>
        </div>
      </div>
      {movie.title.length > 0 ? (
        <Movie
          title={movie.title}
          image_url={movie.backdrop_path}
          score={movie.vote_average}
          description={movie.overview}
          released={movie.release_date}
        />
      ) : null}
    </div>
  );
};

export default App;
