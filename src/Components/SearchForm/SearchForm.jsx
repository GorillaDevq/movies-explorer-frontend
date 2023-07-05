import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

import './SearchForm.css'

export default function SearchForm({storageName ,...props}) {
  const location = useLocation()

  const [isChecked, setIsChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (evt) => setSearchValue(evt.target.value);

  const handleCheckboxChange = (evt) => {
    const storage = localStorage.getItem(storageName);
    const movies = JSON.parse(storage);
    const { checked } = evt.target
    setIsChecked(checked)
    props.onCheckbox(movies.movies, checked, searchValue)
  };

  const handleSubmitSearch = (evt) => {
    evt.preventDefault();
    props.onSearch(searchValue, isChecked, props.movieList);
  }

  useEffect(() => {
    if (location.pathname) {
      setSearchValue('')
      const storage = localStorage.getItem(storageName);
      if (storage) {
        const movies = JSON.parse(storage);
        setIsChecked(movies.checkbox);
        if (location.pathname === '/movies') setSearchValue(movies.searchValue);
        return
      }
      return
    }
  }, [location.pathname, storageName])

  return (
    <form className='search-form' onSubmit={handleSubmitSearch}>
      <input type='text' className='search-form__input' placeholder='Фильм' onChange={handleChangeInput} value={searchValue || ''} required/>
      <FilterCheckbox isChecked={isChecked} onCheck={handleCheckboxChange}/>
      <button className='search-form__submit'>Найти</button>
    </form>
  )
}
