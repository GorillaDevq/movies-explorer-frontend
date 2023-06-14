import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <p className='portfolio__paragraph'>Статичный сайт</p>
          <a className='portfolio__link' href='https://github.com/GorillaDevq' target='_blank' rel='noreferrer'>&#8599;</a>
        </li>
        <li className='portfolio__item'>
          <p className='portfolio__paragraph'>Адаптивный сайт</p>
          <a className='portfolio__link' href='https://github.com/GorillaDevq' target='_blank' rel='noreferrer'>&#8599;</a>
        </li>
        <li className='portfolio__item'>
          <p className='portfolio__paragraph'>Одностраничное приложение</p>
          <a className='portfolio__link' href='https://github.com/GorillaDevq' target='_blank' rel='noreferrer'>&#8599;</a>
        </li>
      </ul>
    </section>
  )
}
