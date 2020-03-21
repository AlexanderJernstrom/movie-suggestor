import React from "react";

interface MovieProps {
  title: string;
  image_url: string;
  score?: Number;
}

const Movie: React.FC<MovieProps> = props => {
  console.log(props.image_url);
  return (
    <div>
      <h3>{props.title}</h3>
      <img src={`https://image.tmdb.org/t/p/w500${props.image_url}`} />
      <h4>Rating: {props.score}</h4>
    </div>
  );
};

export default Movie;
