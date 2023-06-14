import { Link } from 'react-router-dom';

import './Header.css'
import logoPath from '../../images/logo.svg'
import accountPath from '../../images/account.svg'
export default function Header(props) {
  return (
      <header className='header'>
        <img className='header__logo' alt='Лого' src={logoPath}/>
        {props.loggedIn
          ?
            <>
              <Link to={'/movies'} className='header__link' >Фильмы</Link>
              <Link to={'/saved-movies'} className='header__link header__link_type_saved' >Сохранённые фильмы</Link>
              <button type='button' className='header__account'>
                <img className='header__account-img' src={accountPath} alt='Аккаунт'/>
                Аккаунт
              </button>
            </>
          :
            <>
              <Link to={'/signup'} className='header__register' >Регистрация</Link>
              <button type='button' className='header__button'>Войти</button>
            </>
        }
      </header>
    );
}
