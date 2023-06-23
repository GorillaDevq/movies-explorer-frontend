import './NavTab.css'

export default function NavTab() {
  return (
    <nav className='navbar'>
      <ul className='navbar__list'>
        <li className='navbar__item'><a className='navbar__link' href='#about-project'>О проекте</a></li>
        <li className='navbar__item'><a className='navbar__link' href='#techs'>Технологии</a></li>
        <li className='navbar__item'><a className='navbar__link' href='#about-me'>Студент</a></li>
      </ul>
    </nav>
  )
}
