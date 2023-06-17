import MoviesCard from "../MoviesCard/MoviesCard"

import './MoviesCardList.css'

export default function MoviesCardList() {
  return (
    <section className='movies-list'>
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </section>
  )
}