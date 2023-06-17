import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AuthForm from '../AuthForm/AuthForm';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function App() {
  const [loggedIn, isLoggedIn] = useState(true)

  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute element={
          <>
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </>
        }/>
      }/>
      <Route path='/movies' element={
        <>
          <Header loggedIn={loggedIn} />
          <SearchForm />
          <MoviesCardList />
          <Footer />
        </>
      }/>
      <Route path='/signin' element={ <AuthForm /> }/>
      <Route path='/signup' element={ <AuthForm /> }/>
      <Route path='*' element={ <NotFound /> }/>

    </Routes>
  );
};

