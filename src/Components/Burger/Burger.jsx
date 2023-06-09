import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import './Burger.css'

export default function Burger() {
  const [isBurger, setBurger] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/profile')
  }

  return (
    <>
      <button type='button' className='burger-button' onClick={() => setBurger((prevState) => !prevState)}></button>
      <section className={`burger ${isBurger ? 'burger_active' : ''}`}>
        <nav className='burger__navigation'>
          <button className='burger__close' onClick={() => setBurger((prevState) => !prevState)}></button>
          <ul className='burger__list'>
            <li className='burger__item'>
              <Link className={`burger__link ${(location.pathname === '/') ? 'burger__link_active' : ''}`} to={'/'}>Главная</Link>
            </li>
            <li className='burger__item'>
              <Link className={`burger__link ${(location.pathname === '/movies') ? 'burger__link_active' : ''}`} to={'/movies'}>Фильмы</Link>
            </li>
            <li className='burger__item'>
              <Link className={`burger__link ${(location.pathname === '/saved-movies') ? 'burger__link_active' : ''}`} to={'/saved-movies'}>Сохранённые фильмы</Link>
            </li>
            <li className='burger__item'>
              <button type='button' className='account' onClick={handleNavigate}>
                <svg className='account-img' width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule='evenodd' clipRule={"evenodd"} d="M8 4C8 5.10457 7.10457 6 6 6C4.89543 6 4 5.10457 4 4C4 2.89543 4.89543 2 6 2C7.10457 2 8 2.89543 8 4ZM10 4C10 6.20914 8.20914 8 6 8C3.79086 8 2 6.20914 2 4C2 1.79086 3.79086 0 6 0C8.20914 0 10 1.79086 10 4ZM4 9C1.79086 9 0 10.7909 0 13V14H2V13C2 11.8954 2.89543 11 4 11H8C9.10457 11 10 11.8954 10 13V14H12V13C12 10.7909 10.2091 9 8 9H4Z" fill="white"/>
                </svg>
                Аккаунт
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}