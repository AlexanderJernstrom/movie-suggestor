import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Movie from "./Movie";

interface MovieSchema {
  title: string;
  vote_average: Number;
  backdrop_path: string;
}

const App: React.FC = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<MovieSchema>({
    title: "",
    vote_average: 0,
    backdrop_path: ""
  });

  const changeOption = (e: React.FormEvent<HTMLSelectElement>) => {
    console.log(selectedGenre);
    setSelectedGenre(e.currentTarget.value.toString());
    setTimeout(() => console.log(selectedGenre), 1000);
    const value = e.currentTarget.value;
    setTimeout(() => {
      console.log("Selected genre: " + selectedGenre, "Option genre: " + value);
    }, 1000);
  };

  const getMovie = () => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=apikeytothemoviedatabse&with_genres=${selectedGenre}&sort_by=popularity.desc`
      )
      .then(res => {
        const randomNumber = Math.floor(
          Math.random() * res.data.results.length
        );
        setMovie(res.data.results[randomNumber]);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=apikeytothemoviedatabse&language=en-EN"
      )
      .then(res => {
        setGenres(res.data.genres);
        setSelectedGenre(res.data.genres[0].id.toString());
      });
  }, []);
  return (
    <div className="App">
      <h2>What should I watch?</h2>
      <select onChange={e => changeOption(e)}>
        {genres.map((genre: { name: string; id: number }) => {
          return <option value={genre.id.toString()}>{genre.name}</option>;
        })}
      </select>
      <button onClick={() => getMovie()}>Get me a movie</button>
      {movie.title.length > 0 ? (
        <Movie
          title={movie.title}
          image_url={movie.backdrop_path}
          score={movie.vote_average}
        />
      ) : null}
    </div>
  );
};

export default App;
