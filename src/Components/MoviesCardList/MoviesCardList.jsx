import { useLocation } from "react-router-dom"

import MoviesCard from "../MoviesCard/MoviesCard"

import './MoviesCardList.css'

import { movieList, savedMovies } from '../../utils/constants/constants'

export default function MoviesCardList(props) {
  const location = useLocation()

  return (
    <>
      <section className='movies-list'>
        {location.pathname === '/movies'
          ? ( movieList.length > 0
              ? movieList.map((item, index) => <MoviesCard key={index} movie={item} />)
              : <h1 className='movies-list__title'>Нет фильмов</h1>
          )
          : ( savedMovies.length > 0 
            ? savedMovies.map((item, index) => <MoviesCard key={index} movie={item}/>)
            : <h1 className='movies-list__title'>Нет сохраненных фильмов</h1>
          )
        }
      </section>
      <section className='movies-render'>
        {props.more &&
          <button type='button' className='movies-render__button'>Ещё</button>
        }
      </section>
    </>
  )
}