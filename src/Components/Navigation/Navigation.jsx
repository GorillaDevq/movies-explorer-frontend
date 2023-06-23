import { Link, useNavigate } from "react-router-dom"
import React from "react"

import Burger from "../Burger/Burger"

import './Navigation.css'

import accountPath from '../../images/account.svg'

export default function Navigation(props) {
  const navigate = useNavigate()
  
  return (
    <>
      {props.loggedIn
        ?
        <>
          <nav className='navigation navigation_type_logged'>
            <Link to={'/movies'} className='navigation__link' >Фильмы</Link>
            <Link to={'/saved-movies'} className='navigation__link' >Сохранённые фильмы</Link>
            <button type='button' className='account' onClick={() => navigate('/profile')}>
              <img className='account-img' src={accountPath} alt='Аккаунт'/>
              Аккаунт
            </button>
          </nav>
          <Burger />
        </>
        :
        <>
          <nav className='navigation'>
            <Link to={'/signup'} className='navigation__link navigation__link_type_register'>Регистрация</Link>
            <button type='button' className='navigation__button' onClick={() => navigate('/signin')}>Войти</button>
          </nav>
        </>
      }
    </>
  )
}