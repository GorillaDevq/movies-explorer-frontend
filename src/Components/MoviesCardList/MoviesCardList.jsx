import { useLocation } from "react-router-dom"
import { useEffect } from "react"

import Preloader from "../Preloader/Preloader"
import MoviesCard from "../MoviesCard/MoviesCard"

import { NULL_FILM } from "../../utils/constants/constants"

import './MoviesCardList.css'

export default function MoviesCardList({ setLoading, showMovieList, showSavedMovieList, ...props}) {
  const location = useLocation();
    
  const isEmptyStorage = localStorage.getItem(props.storageName)

  useEffect(() => {
    if (location.pathname === '/movies') {
      setLoading(true)
      showSavedMovieList()
      showMovieList()
    } else if (location.pathname === '/saved-movies') {
      setLoading(true)
      showSavedMovieList()
    }
  }, [showMovieList, location.pathname, showSavedMovieList, setLoading])

  const handleShowButton = () => {
    props.handleShowButton(props.movieList, props.storageName)
  }
  return (
    <>
    {props.isLoading ? 
      <Preloader />
      : (isEmptyStorage ?
          (props.movieList.length > NULL_FILM 
            ? (
                <>
                  <section className='movies-list'>
                    {props.movieList.map((item) => <MoviesCard 
                      key={item.nameRU} 
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
              )
            : ( <h1 className='movies-title'>Ничего не найдено</h1> )
        )
        : (
          <h1 className='movies-title'>Фильмов нет</h1>
        )
      )
    }
  </>
    // <>
    //   {isEmptyStorage ? 
    //     (props.isLoading ?
    //       <Preloader />
    //       : (props.movieList.length > NULL_FILM 
    //         ? (
    //             <>
    //               <section className='movies-list'>
    //                 {props.movieList.map((item) => <MoviesCard 
    //                   key={item.nameRU} 
    //                   movie={item} 
    //                   onSave={props.handleSavedMovie} 
    //                   savedMovieList={props.savedMovieList} 
    //                   onLike={props.switchLikeMovie} 
    //                   onDelete={props.handleDeleteMovie}
    //                 />)}
    //               </section>
    //               <section className='movies-render'>
    //                 {props.isVisibleButton &&
    //                   <button type='button' className='movies-render__button' onClick={handleShowButton}>Ещё</button>
    //                 }
    //               </section>
    //             </>
    //           )
    //         : ( <h1 className='movies-title'>Ничего не найдено</h1> )
    //       )
    //     )
    //     : (
    //       <h1 className='movies-title'>Фильмов нет</h1>
    //     )
    //   }
    // </>
  )
}