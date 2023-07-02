import { useLocation } from "react-router-dom"
import { useEffect } from "react"

import MoviesCard from "../MoviesCard/MoviesCard"

import './MoviesCardList.css'

export default function MoviesCardList({ showMovieList, showSavedMovieList, ...props}) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      showSavedMovieList()
      showMovieList()
    } else if (location.pathname === '/saved-movies') {
      showSavedMovieList()
    }
  }, [showMovieList, location.pathname, showSavedMovieList])

  const handleShowButton = () => {
    props.handleShowButton(props.movieList, props.storageName)
  }

  return (
    <>
      {props.movieList.length > 0 
        ? 
          <>
            <section className='movies-list'>
              {props.movieList.map((item) => <MoviesCard key={item.nameRU} 
                movie={item} 
                onSave={props.handleSavedMovie} 
                savedMovieList={props.savedMovieList} 
                onLike={props.switchLikeMovie} 
                onDelete={props.handleDeleteMovie}
              />)}
            </section>
            <section className='movies-render'>
              {props.isVisibleButton &&
                <button type='button' className='movies-render__button' onClick={handleShowButton}>Ещё</button>
              }
            </section>
          </>
        : <h1 className='movies-title'>Ничего не найдено</h1>
      }
    </>
  )
}