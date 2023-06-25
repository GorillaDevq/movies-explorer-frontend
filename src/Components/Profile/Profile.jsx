import { Link } from 'react-router-dom'
import React from 'react'

import './Profile.css'

export default function Profile() {
  const [name, setName] = React.useState('Виталий')
  const [email, setEmail] = React.useState('pochta@yandex.ru')

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile__form'>
        <fieldset className='profile__field'>
          <label className='profile__label'>Имя</label>
          <input type='text' className='profile__input' value={name} placeholder='Введите имя' onChange={(evt) => setName(evt.target.value)} required/>
        </fieldset>
        <fieldset className='profile__field'>
          <label className='profile__label'>E-mail</label>
          <input type='text' className='profile__input' value={email} placeholder='Введите email' onChange={(evt) => setEmail(evt.target.value)} required/>
        </fieldset>
        <button type='submit' className='profile__submit'>Редактировать</button>
      </form>
      <Link to={'/signin'} className='profile__link'>Выйти из аккаунта</Link>
    </section>
  )
}