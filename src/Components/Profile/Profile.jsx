import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import CurrentUserContext from '../../utils/context/CurrentUserContext'
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation';
import { useEmptyValidation, useRegexValidation } from '../../utils/hooks/useInputWithValidation';
import './Profile.css'

export default function Profile({ onSetError , ...props}) {
  const currentUser = useContext(CurrentUserContext)
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();

  // Стейт для регулярного выражения
  const isValidRegex = useRegexValidation(values.name);

  // Стейты для проверки isEmptyInput
  const isEmptyEmail = useEmptyValidation(values.email);
  const isValidName = useEmptyValidation(values.name);  

  // Проверка на дупликат данных
  const isDuplicate = currentUser === values

  // Проверка для className 
  const isValidUpdate = isValid && isEmptyEmail && isValidName && (isValidRegex === '') && !isDuplicate

  // Отправка данных для редактировании профиля
  const onSubmitForm = (evt) => {
    evt.preventDefault()
    props.onSubmit(values)
  }
 
  // Закгрузка данных для контекста
  useEffect(() => {
    setValues(currentUser)
  }, [currentUser, setValues])

  useEffect(() => {
    onSetError('')
  }, [onSetError])

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' onSubmit={onSubmitForm}>
        <fieldset className='profile__field'>
          <label className='profile__label'>Имя</label>
          <input type='text' className='profile__input' placeholder='Введите имя' name='name' value={values.name || ''} onChange={handleChange} required/>
          {errors.name && <span className='profile__error'>{errors.name}</span>}
          {isValidRegex && <span className='profile__error'>{isValidRegex}</span>}
        </fieldset>
        <fieldset className='profile__field'>
          <label className='profile__label'>E-mail</label>
          <input type='email' className='profile__input profile__input_type_last' placeholder='Введите email' name='email' value={values.email || ''} onChange={handleChange} required/>
          {errors.email && <span className='profile__error'>{errors.email}</span>}
        </fieldset>
        {props.errorMessage && <span className='profile__error profile__error_type_submit'>{props.errorMessage}</span>}
        <button type='submit' className={`profile__submit ${isValidUpdate ? `` : `profile__submit_disabled`}`}>Редактировать</button>
      </form>
      <Link to={'/signin'} className='profile__link' onClick={props.onLogOut}>Выйти из аккаунта</Link>
    </section>
  )
}