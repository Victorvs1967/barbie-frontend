import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'http://victorvs.pythonanywhere.com';

const App = () => {
  const [ movies, setMovies ] = useState([]);
  const [ randomMovie, setRandomMovie ] = useState(null);

  useEffect(() => {
    axios.get(BASE_URL.concat('/api/movies'))
      .then(response => setMovies(response.data))
      .catch(error => console.error(error))
  }, []);

  const handleRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setRandomMovie(movies[randomIndex]);
  };

  return (
    <div className='app-container'>
      <h1 className='title'>Barbie Movie Chooser</h1>
      <div className='movie-list'>
        { movies.map(movie => (
          <div key={ movie.id } className='movie-item'>
            <h2 className='movie-title'>{ movie.title }</h2>
            <p className='movie-detailes'>Release Year: { movie.year }</p>
            <p className='movie-detailes'>Director: { movie.director }</p>
            <p className='movie-detailes'>Cast: { movie.cast.join(', ') }</p>
            <p className='movie-detailes'>{ movie.synopsis }</p>
            <hr />
          </div>
        )) }
      </div>
      <button className='random-button' onClick={ handleRandomMovie }>Get Random Barbie Movie</button>
      { randomMovie && (
        <div className='random-movie'>
          <h2 className='random-title'>Randomly Selected Movie:</h2>
          <h3>{ randomMovie.title }</h3>
          <p>Release Year: { randomMovie.year }</p>
          <p>Director: { randomMovie.director }</p>
          <p>Cast: { randomMovie.cast.join(', ') }</p>
          <p>{ randomMovie.synopsis }</p>
        </div>
      ) }
    </div>
  );
};

export default App;
