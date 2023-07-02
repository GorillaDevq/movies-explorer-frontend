import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

import './SearchForm.css'

export default function SearchForm(props) {
  const location = useLocation()

  const [isChecked, setIsChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (evt) => setSearchValue(evt.target.value);

  const handleCheckboxChange = (evt) => {
    const { checked } = evt.target
    setIsChecked(checked)
    props.onCheckbox(props.movieListFiltred, checked)
  };

  const handleSubmitSearch = (evt) => {
    evt.preventDefault();
    props.onSearch(searchValue, isChecked, props.movieList);
    setSearchValue('')
  }

  useEffect(() => {
    if (location.pathname) {
      setSearchValue('')
    }
  }, [location.pathname])

  return (
    <form className='search-form' onSubmit={handleSubmitSearch}>
      <input type='text' className='search-form__input' placeholder='Фильм' onChange={handleChangeInput} value={searchValue || ''} required/>
      <FilterCheckbox isChecked={isChecked} onCheck={handleCheckboxChange}/>
      <button className='search-form__submit'>Найти</button>
    </form>
  )
}
