import './Portfolio.css'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/GorillaDevq/how-to-learn' target='_blank' rel='noreferrer'>Статичный сайт <span className='portfolio__arrow'>&#8599;</span></a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/GorillaDevq/russian-travel' target='_blank' rel='noreferrer'>Адаптивный сайт <span className='portfolio__arrow'>&#8599;</span></a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/GorillaDevq/react-mesto-api-full-gha' target='_blank' rel='noreferrer'>Одностраничное приложение <span className='portfolio__arrow'>&#8599;</span></a>
        </li>
      </ul>
    </section>
  )
}
