import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AuthForm from '../AuthForm/AuthForm';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Profile from '../Profile/Profile';
import Preloader from '../Preloader/Preloader';

export default function App() {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Routes>
      <Route path='/' element={
        //Роут - основной
        <ProtectedRoute isLoggedIn={true} element={
          isLoading
            ? <Preloader />
            : <>
                <Header loggedIn={false} />
                <Main />
                <Footer />
              </>
        }/>
      }/>
      <Route path='/movies' element={
        //Роут - фильмы
        <ProtectedRoute isLoggedIn={true} element={
          <>
            <Header loggedIn={true} />
            <SearchForm />
            <MoviesCardList more={true} />
            <Footer />
          </>
        }/>
      }/>
      <Route path='/saved-movies' element={
        //Роут - сохраненные фильмы
        <ProtectedRoute isLoggedIn={true} element={
          <>
            <Header loggedIn={true} />
            <SearchForm />
            <MoviesCardList more={false} />
            <Footer />
          </>
        }/>
      }/>
      <Route path='/profile' element={
        //Роут - профиль
        <ProtectedRoute isLoggedIn={true} element={
          <>
            <Header loggedIn={true} />
            <Profile />
          </>
        }/>
      }/>
      <Route path='/signin' element={ <AuthForm /> }/>
      <Route path='/signup' element={ <AuthForm /> }/>
      <Route path='*' element={ <NotFound /> }/>
    </Routes>
  );
};

