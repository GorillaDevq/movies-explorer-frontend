import './FilterCheckbox.css'

export default function FilterCheckbox(props) {
  return (
    <div className='checkbox'>
      <label className={`checkbox__container ${props.isChecked && `checkbox__container_active`}`}>
        <input type="checkbox" className='checkbox__input' checked={props.isChecked} onChange={props.onCheck}/>
        <span className="checkbox__checkmark"></span>
      </label>
      <p className='checkbox__label'>Короткометражки</p>
    </div>
  )
}
