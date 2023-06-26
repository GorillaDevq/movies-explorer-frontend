//Импортируем библиотеки
import { useNavigate, Link } from 'react-router-dom';
//Импортируем стили
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()

  const handleGoBack = () => navigate(-1)

  return (
    <section className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <Link className='not-found__link' to={'#'} onClick={handleGoBack}>Назад</Link>
    </section>
  )
}
