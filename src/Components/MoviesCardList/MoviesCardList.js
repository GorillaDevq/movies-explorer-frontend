import MoviesCard from "../MoviesCard/MoviesCard"

import './MoviesCardList.css'

import { movieList } from '../../utils/constants/constants'

export default function MoviesCardList() {
  return (
    <>
      <section className='movies-list'>
        {movieList.map((item, index) => <MoviesCard key={index} movie={item}/>)}
      </section>
      <section className='movies-render'>
        <button type='button' className='movies-render__button'>Ещё</button>
      </section>
    </>
  )
}