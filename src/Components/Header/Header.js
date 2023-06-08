import { Link } from 'react-router-dom';

import './Header.css'
import logoPath from '../../images/logo.svg'

export default function Header() {
  return (
      <header className='header'>
        <img className='header__logo' alt='Лого' src={logoPath}/>
        <Link to={'/gnom'} className='header__register' >Регистрация</Link>
        <button className='header__button'>
          <Link to={'/gnommmm'} className='header__login' >Войти</Link>
        </button>
      </header>
    );
}