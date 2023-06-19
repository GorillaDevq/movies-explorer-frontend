import Navigation from '../Navigation/Navigation';

import './Header.css'
import logoPath from '../../images/logo.svg'

export default function Header(props) {
  return (
      <header className='header'>
        <img className='header__logo' alt='Лого' src={logoPath}/>
        <Navigation loggedIn={props.loggedIn}/>
      </header>
    );
}
