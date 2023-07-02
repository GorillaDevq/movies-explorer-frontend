import './SuccessPopup.css'

export default function SuccessPopup(props) {
  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button className='popup__close' onClick={props.onClose}></button>
        <h2 className='popup__title'>{props.text}</h2>
      </div>
    </section>
  )
}