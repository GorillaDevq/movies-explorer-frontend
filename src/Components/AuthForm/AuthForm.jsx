import { Link, useLocation } from 'react-router-dom'

import './AuthForm.css'
import logoPath from '../../images/logo.svg'

export default function AuthForm() {
  const location = useLocation();

  return (
    <section className='authorization'>
      <img className='authorization__logo' src={logoPath} alt='Лого'/>
      <h1 className='authorization__title'>
        {location.pathname === '/signin' 
          ? 'Рады видеть!'
          : 'Добро пожаловать!'
        }
        </h1>
      <form className='form'>
        <ul className='form__list'>
          {(location.pathname) === '/signup' &&
            <li className='form__item'>
              <label className='form__label'>Имя</label>
              <input className='form__input' type='text' required/>
              <span className='form__error'>Что-то пошло не так...</span>
            </li>
          }
          <li className='form__item'>
            <label className='form__label'>Email</label>
            <input className='form__input' type='email' required/>
            <span className='form__error'>Что-то пошло не так...</span>
          </li>
          <li className='form__item'>
            <label className='form__label'>Пароль</label>
            <input className='form__input form__input_active' type='password' required/>
            <span className='form__error form__error_active'>Что-то пошло не так...</span>
          </li>
        </ul>
        <button className='form__submit' type='submit' >
          {location.pathname === '/signin' 
            ? 'Войти'
            : 'Зарегестрироваться'
          }
        </button>
        {location.pathname === '/signin'
          ? <p className='form__paragraph'>Ещё не зарегистрированы? <Link to={'/signup'} className='form__link'>Регистрация</Link></p>
          : <p className='form__paragraph'>Уже зарегистрированы? <Link to={'/signin'} className='form__link'>Войти</Link></p>
        }
      </form>
    </section>
  )
}
