import { Link, useLocation } from 'react-router-dom'

import './AuthForm.css'
import logoPath from '../../images/logo.svg'

export default function AuthForm() {
  const location = useLocation();

  return (
    <section className='authorization'>
      <img className='authorization__logo' src={logoPath} alt='Лого'/>
      <h1 className='authorization__title'>Рады видеть!</h1>
      <form className='form'>
        <ul className='form__list'>
          {location.pathname === '/signup' ?
            <li className='form__item'>
              <label className='form__label'>Имя</label>
              <input className='form__input' type='text' required/>
            </li> : null
          }
          <li className='form__item'>
            <label className='form__label'>Email</label>
            <input className='form__input' type='email' required/>
          </li>
          <li className='form__item'>
            <label className='form__label' type='password'>Пароль</label>
            <input className='form__input'/>
          </li>
        </ul>
        <button className='form__submit' type='submit' >Войти</button>
        {location.pathname === '/signin'
          ? <p className='form__paragraph'>Ещё не зарегистрированы? <Link to={'/signup'} className='form__link'>Регистрация</Link></p>
          : <p className='form__paragraph'>Уже зарегистрированы? <Link to={'/signin'} className='form__link'>Войти</Link></p>
        }
      </form>
    </section>
  )
}
