import './MoviesCard.css'
import React from 'react'
export default function MoviesCard() {
  const [like, setLike] = React.useState(false)

  return (
    <div className='movie'>
      <img alt='Фильм' src={'https://sun9-71.userapi.com/impg/_mybTv6EADP-9-cPnQNqf2e4VdSNQJlSm78_XQ/yvdQL3vzLoQ.jpg?size=364x203&quality=95&sign=910417a11f53be65c7efcccf8973ffbc&type=album'}/>
      <ul className='movie__info'>
        <li className='movie__item'>
          <h2 className='movie__title'>Киноальманах «100 лет дизайна»</h2>
        </li>
        <li className='movie__item'>
          <p className='movie__during'>1ч 3м</p>
        </li>
        <li className='movie__item movie__item_type_like'>
          <button type='button' className={`movie__like ${like && `movie__like_active`}`} onClick={() => setLike((prevState) => !prevState)}></button>
        </li>
      </ul>
    </div>
  )
}