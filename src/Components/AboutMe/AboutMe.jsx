import './AboutMe.css'
import studentPath from '../../images/student.png';

export default function AboutMe(){
  return (
    <section className='about-me' id='about-me'>
      <h2 className='article-title'>Студент</h2>
      <div className='about-me__columns'>
        <ul className='about-me__info'>
          <li className='about-me__item'>
            <h3 className='about-me__title'>Виталий</h3>
          </li>
          <li className='about-me__item'>
            <p className='about-me__subtitle'>Фронтенд-разработчик, 30 лет</p>
          </li>
          <li className='about-me__item'>
            <p className='about-me__paragraph'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
              Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
              После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </li>
          <li className='about-me__item'>
            <a className='about-me__link' href='https://github.com/GorillaDevq' target='_blank' rel='noreferrer'>Github</a>
          </li>
        </ul>
        <img className='about-me__image' alt='Студент' src={studentPath}/>
      </div>
    </section>
  )
}
