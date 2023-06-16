import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

import './SearchForm.css'

export default function SearchForm() {
  return (
    <form className='search-form'>
      <input type='text' className='search-form__input' placeholder='Фильм'/>
      <FilterCheckbox />
      <button className='search-form__submit'>Найти</button>
    </form>
  )
}
