import './FilterCheckbox.css'
import React from 'react'
export default function FilterCheckbox() {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <div className='checkbox'>
      <label className={`checkbox__container ${isChecked && `checkbox__container_active`}`}>
        <input type="checkbox" className='checkbox__input' checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}/>
        <span className="checkbox__checkmark"></span>
      </label>
      <p className='checkbox__label'>Короткометражки</p>
    </div>
  )
}
