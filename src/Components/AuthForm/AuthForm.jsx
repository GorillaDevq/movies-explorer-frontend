import { Link, useLocation } from 'react-router-dom'

import './AuthForm.css'

export default function AuthForm() {
  const location = useLocation();

  return (
    <section className='authorization'>
      <svg className='authorization__logo' width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule={"evenodd" } d="M19 38C29.4934 38 38 29.4934 38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38ZM19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z" fill="#3DDC84"/>
      </svg>
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
              <input className='form__input' type='text' placeholder='Введите имя' required/>
              <span className='form__error'>Что-то пошло не так...</span>
            </li>
          }
          <li className='form__item'>
            <label className='form__label'>Email</label>
            <input className='form__input' type='email' placeholder='Введите email' required/>
            <span className='form__error'>Что-то пошло не так...</span>
          </li>
          <li className='form__item'>
            <label className='form__label'>Пароль</label>
            <input className='form__input form__input_active' placeholder='Введите пароль' type='password' required/>
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
