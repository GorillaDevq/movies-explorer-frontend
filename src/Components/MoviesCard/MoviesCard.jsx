import React from 'react'
import { useLocation } from 'react-router-dom'

import './MoviesCard.css'
export default function MoviesCard({ movie, ...props }) {
  const location = useLocation();
  const [like, setLike] = React.useState(false)

  return (
    <div className={`movie ${(location.pathname === '/saved-movies') ? 'movie_active' : ''}`}>
      <img alt={movie.alt} src={movie.src} className='movie__image'/>
      <ul className='movie__info'>
        <li className='movie__item'>
          <h2 className='movie__title'>{movie.title}</h2>
        </li>
        <li className='movie__item'>
          <p className='movie__during'>{movie.during}</p>
        </li>
        <li className='movie__item movie__item_type_like'>
          {location.pathname === '/saved-movies'
            ? <button type='button' className='movie__delete'></button>
            : <button type='button' className={`movie__like ${like ? `movie__like_active` : ''}`} onClick={() => setLike((prevState) => !prevState)}></button>
          }
        </li>
      </ul>
    </div>
  )
}