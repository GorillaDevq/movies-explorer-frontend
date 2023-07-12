import React from 'react'
import { useLocation } from 'react-router-dom'

import './MoviesCard.css'
export default function MoviesCard({ movie, ...props }) {
  const location = useLocation();

  const isLiked = props.savedMovieList.some((item) => item.movieId === movie.id)

  const handleDeleteMovie = () => {
    props.onDelete(movie._id)
  }

  const switchLikeMovie = () => {
    props.onLike(movie, movie.id, isLiked)
  }

  const returnTime = () => {
    let hours
    let minutes
    if (movie.duration > 60) {
      hours = Math.floor(movie.duration / 60)
      minutes = movie.duration % 60 
      return { hours: `${hours} ч`, minutes: `${minutes} м` }
    } else {
      minutes = movie.duration
      return { hours: ``, minutes: `${minutes} м`}
    }
  }

  return (
    <div className={`movie ${location.pathname === '/saved-movies' ? 'movie_active' : ''}`}>
      <a className='movie__image-link' href={movie.trailerLink} target='_blank' rel='noreferrer'>
      <img alt={movie.nameRU} src={location.pathname === `/movies` ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image} className='movie__image'/>
      </a>
      <ul className='movie__info'>
        <li className='movie__item'>
          <h2 className='movie__title'>{movie.nameRU}</h2>
        </li>
        <li className='movie__item'>
          <p className='movie__during'>{`${returnTime().hours} ${returnTime().minutes}`}</p>
        </li>
        <li className='movie__item movie__item_type_like'>
          {location.pathname === '/saved-movies'
            ? <button type='button' className='movie__delete' onClick={handleDeleteMovie}></button>
            : <button type='button' className={`movie__like ${isLiked && `movie__like_active`}`} onClick={switchLikeMovie}></button>
          }
        </li>
      </ul>
    </div>
  )
}