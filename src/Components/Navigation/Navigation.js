import { Link } from "react-router-dom"

import './Navigation.css'

import accountPath from '../../images/account.svg'

export default function Navigation(props) {
  return (
    <>
      {props.loggedIn
        ?
        <nav className='navigation'>
          <Link to={'/movies'} className='navigation__link' >Фильмы</Link>
          <Link to={'/saved-movies'} className='navigation__link' >Сохранённые фильмы</Link>
          <button type='button' className='navigation__account'>
            <img className='navigation__account-img' src={accountPath} alt='Аккаунт'/>
            Аккаунт
          </button>
        </nav>
        :
        <nav className='navigation'>
          <Link to={'/signup'} className='navigation__link navigation__link_type_register'>Регистрация</Link>
          <button type='button' className='navigation__button'>Войти</button>
        </nav>
      }
    </>
  )
}