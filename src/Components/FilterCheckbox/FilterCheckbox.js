import './FilterCheckbox.css'
import React from 'react'
export default function FilterCheckbox() {
  const [isChecked, setIsChecked] = React.useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked)
  }

  return (
    <div className='checkbox__container'>
      <label className={`checkbox ${isChecked && `checkbox_active`}`}>
        <input type="checkbox" className='checkbox__input' checked={isChecked} onChange={handleCheckboxChange}/>
        <span className="checkbox__checkmark"></span>
      </label>
      <p className='checkbox__label'>Короткометражки</p>
    </div>
  )
}
