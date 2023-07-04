// Библиотеки реакт
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
// Кастомные хуки
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import { useEmptyValidation, useRegexNameValidation, useRegexEmailValidation } from '../../utils/hooks/useInputWithValidation';

// Стили
import './AuthForm.css'

export default function AuthForm({ isLoggedIn, onSetError, ...props }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  // Стейт для регулярного выражения
  const isValidNameRegex = useRegexNameValidation(values.name);
  const { isErrorEmailRegex, handleChangeEmail }  = useRegexEmailValidation(values.email);

  // Стейты для проверки isEmptyInput
  const isEmptyEmail = useEmptyValidation(values.email);
  const isEmptyName = useEmptyValidation(values.name);  
  const isEmptyPassword = useEmptyValidation(values.password);
  
  // Проверки для className 
  const isValidSignIn = isValid && isEmptyEmail && isEmptyPassword && (isErrorEmailRegex === '')
  const isValidSignUp = isValidSignIn && isEmptyName && (isValidNameRegex === '')

  // Отправка данных для регистрации или логина
  const handleSubmitForm = (evt) => {
    evt.preventDefault()
    if (isValid) {
      props.onSubmit(values)  
    }
  }

  const onChangeEmail = (evt) => {
    handleChangeEmail(evt);
    handleChange(evt);
  }

  const handleChangeError = () => onSetError('')

  useEffect(() => {
    if (isLoggedIn) {
      navigate(-1)
    }
  })

  return (
    <section className='authorization'>
      <Link to={'/'} className='authorization__link'>
        <svg className='authorization__logo' width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule={"evenodd" } d="M19 38C29.4934 38 38 29.4934 38 19C38 8.50659 29.4934 0 19 0C8.50659 0 0 8.50659 0 19C0 29.4934 8.50659 38 19 38ZM19 28.5C24.2467 28.5 28.5 24.2467 28.5 19C28.5 13.7533 24.2467 9.5 19 9.5C13.7533 9.5 9.5 13.7533 9.5 19C9.5 24.2467 13.7533 28.5 19 28.5Z" fill="#3DDC84"/>
        </svg>
      </Link>
      <h1 className='authorization__title'>
        {location.pathname === '/signin' 
          ? 'Рады видеть!'
          : 'Добро пожаловать!'
        }
        </h1>
      <form className='form' onSubmit={handleSubmitForm}>
        <ul className='form__list'>
          {(location.pathname) === '/signup' &&
            <li className='form__item'>
              <label className='form__label'>Имя</label>
              <input className={`form__input ${errors.name && `form__input_active`}`} name='name' type='text' placeholder='Введите имя' required onChange={handleChange} minLength={2} maxLength={16} value={values.name || ''} />
              {errors.name && <span className='form__error'>{errors.name}</span>}
              {isValidNameRegex && <span className='form__error'>{isValidNameRegex}</span>}
            </li>
          }
          <li className='form__item'>
            <label className='form__label'>Email</label>
            <input className={`form__input ${errors.email && `form__input_active`}`} name='email' type='text' placeholder='Введите email' required onChange={onChangeEmail} value={values.email || ''} />
            {errors.email && <span className='form__error'>{errors.email}</span>}
            {isErrorEmailRegex && <span className='form__error'>{isErrorEmailRegex}</span>}
          </li>
          <li className='form__item'>
            <label className='form__label'>Пароль</label>
            <input className={`form__input ${errors.password && `form__input_active`}`} name='password' type='password' placeholder='Введите пароль' required onChange={handleChange} minLength={2} maxLength={16} value={values.password || ''} />
            {errors.password && <span className='form__error'>{errors.password}</span>}
          </li>
        </ul>
        {props.errorMessage && <span className='form__error form__error_type_submit'>{props.errorMessage}</span>}
        {location.pathname === '/signin' 
          ? <>
              <button className={`form__submit ${isValidSignIn ? `` : `form__submit_disabled`}`} type='submit'>Войти</button>
              <p className='form__paragraph'>Ещё не зарегистрированы? <Link to={'/signup'} className='form__link' onClick={handleChangeError}>Регистрация</Link></p>
            </>
          : <>
              <button className={`form__submit ${isValidSignUp ? `` : `form__submit_disabled`}`} type='submit'>Зарегестрироваться</button>
              <p className='form__paragraph'>Уже зарегистрированы? <Link to={'/signin'} className='form__link' onClick={handleChangeError}>Войти</Link></p>
            </>
        }
      </form>
    </section>
  )
}
