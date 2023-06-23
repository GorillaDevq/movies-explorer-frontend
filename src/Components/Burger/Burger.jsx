import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import './Burger.css'

import accountPath from '../../images/account.svg'

export default function Burger() {
  const [isBurger, setBurger] = React.useState(false)

  const location = useLocation()

  return (
    <>
      <button type='button' className='burger__button' onClick={() => setBurger((prevState) => !prevState)}></button>
      <section className={`burger__container ${isBurger && 'burger__container_active'}`}>
        <nav className='burger__navigation'>
          <button className='burger__close' onClick={() => setBurger((prevState) => !prevState)}></button>
          <ul className='burger__list'>
            <li className='burger__item'><h2 className='burger__title'>Главная</h2></li>
            <li className='burger__item'>
              <Link className={`burger__link ${(location.pathname === '/movies') && 'burger__link_active'}`} to={'/movies'}>Фильмы</Link>
            </li>
            <li className='burger__item'>
              <Link className={`burger__link ${(location.pathname === '/saved-movies') && 'burger__link_active'}`} to={'/saved-movies'}>Сохранённые фильмы</Link>
            </li>
            <li className='burger__item'>
              <button type='button' className='account'>
                <img className='account-img' src={accountPath} alt='Аккаунт'/>
                Аккаунт
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}