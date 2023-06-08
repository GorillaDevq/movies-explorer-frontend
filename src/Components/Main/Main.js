import './Main.css'

export default function Main() {
  return (
    <main className='content'>
      <div className='promo'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <nav className='navbar'>
          <ul className='navbar__list'>
            <li className='navbar__item'><a className='navbar__link' href='фывыф'>О проекте</a></li>
            <li className='navbar__item'><a className='navbar__link' href='фывыф'>Технологии</a></li>
            <li className='navbar__item'><a className='navbar__link' href='фывыф'>Студент</a></li>
          </ul>
        </nav>
      </div>
      <article className='about-project'>
        <h2 className='article-title'>О проекте</h2>
        <ul className='info-list'>
          <li className='info-list__item'>
            <h3 className='info-list__header'>Дипломный проект включал 5 этапов</h3>
            <p className='info-list__paragraph'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className='info-list__item'>
            <h3 className='info-list__header'>На выполнение диплома ушло 5 недель</h3>
            <p className='info-list__paragraph'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className='date-list'>
          <li className='date-list__item'>
            <h3 className='date-list__title date-list__title_type_green'>1 неделя</h3>
            <p className='date-list__subtitle'>Back-end</p>
          </li>
          <li className='date-list__item'>
            <h3 className='date-list__title'>4 недели</h3>
            <p className='date-list__subtitle'>Front-end</p>
          </li>
        </ul>
      </article>
      <article className='techs'>
        <div className='techs__container'>
          <h2 className='article-title'>Технологии</h2>
          <h3 className='techs__title'>7 технологий</h3>
          <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className='techs__list'>
            <li className='techs__item'>HTML</li>
            <li className='techs__item'>CSS</li>
            <li className='techs__item'>JS</li>
            <li className='techs__item'>React</li>
            <li className='techs__item'>Git</li>
            <li className='techs__item'>Express.js</li>
            <li className='techs__item'>mongoDB</li>
          </ul>
        </div>
      </article>
    </main>
  )
}