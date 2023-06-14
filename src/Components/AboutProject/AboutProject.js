import './AboutProject.css'

export default function AboutProject() {
  return (
    <article className='about-project' id='about-project'>
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
  )
}
