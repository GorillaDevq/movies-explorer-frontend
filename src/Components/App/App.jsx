// Библиотеки реакт
import { useState, useEffect, useCallback } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

// Контекст
import CurrentUserContext from '../../utils/context/CurrentUserContext';

// Компоненты
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AuthForm from '../AuthForm/AuthForm';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Profile from '../Profile/Profile';
import SuccessPopup from '../SuccessPopup/SuccessPopup';

// Кастомные хуки
import useWindowInnerWidth from '../../utils/hooks/useWindowInnerWidth';
import useSearchMovies from '../../utils/hooks/useSearchMovies';

// Апи
import mainApi from '../../utils/api/MainApi';
import moviesApi from '../../utils/api/MoviesApi';

// Константы
import { FILTRED_MOVIES, FILTRED_SAVED_MOVIES } from '../../utils/constants/constants';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setLoggedIn] = useState(false)

  // Стейт для прелоадера
  const [isLoading, setLoading] = useState(false)

  // Стейт для попапа
  const [isOpen, setOpen] = useState(false)

  // Данные для контекста
  const [currentUser, setCurrentUser] = useState({})

  // Ошибка полученная с API
  const [errorMessage, setErrorMessage] = useState('');

  // Стейты для Фильмов
  const [movieList, setMovieList] = useState([]);
  const [savedMovieList, setSavedMovieList] = useState([]);

  // Стейты для отрисовки количества Фильмов
  const { moviesPerRows, moviesPerAdd } = useWindowInnerWidth()

  const { handleSearchMovies, 
    handleFilterMovies, 
    visibleMovieList,
    setVisibleMovieList,
    isVisibleButtonMovies,
    setVisibleButtonMovies,
    savedFiltredMovieList,
    setSavedFiltredMovieList,
    isVisibleButtonSaved,
    setVisibleButtonSaved
  } = useSearchMovies(moviesPerRows)

  // Получение всех фильмов API
  const showMovieList = useCallback(async () => {
    let filtredMovies = localStorage.getItem(FILTRED_MOVIES)
    if (filtredMovies) {
      filtredMovies = JSON.parse(filtredMovies);
      setVisibleMovieList(filtredMovies.slice(0, moviesPerRows))
      if (filtredMovies.length > moviesPerRows) setVisibleButtonMovies(true);
      else setVisibleButtonMovies(false);
    }
    try {
      const response = await moviesApi.getInitialsMovies();
      setMovieList(response)
    } catch(err) {
      console.log(err)
    }
  }, [moviesPerRows, setVisibleMovieList, setVisibleButtonMovies])

  // Получение сохраненных фильмов API
  const showSavedMovieList = useCallback(async () => {
    try {
      setLoading(true)
      const response = await mainApi.getSavedMovie();
      setSavedMovieList(response);
      localStorage.setItem(FILTRED_SAVED_MOVIES, JSON.stringify(response));
      setSavedFiltredMovieList(response.slice(0, moviesPerRows));
      if (response.length > moviesPerRows) setVisibleButtonSaved(true);
      else setVisibleButtonSaved(false);
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }, [moviesPerRows, setSavedFiltredMovieList, setVisibleButtonSaved])

  // Отображение кнопки "Ещё"
  const handleShowButton = (arrayMovie, storageMovies) => {
    const currentMoviesLength = arrayMovie.length;
    const filtredMovies =  JSON.parse(localStorage.getItem(storageMovies));
    const nextMoviesLength = filtredMovies.slice(currentMoviesLength, currentMoviesLength + moviesPerAdd);
    if (location.pathname === '/movies') {
      setVisibleMovieList((prevValue) => [...prevValue, ...nextMoviesLength]);
      if (currentMoviesLength + nextMoviesLength.length >= filtredMovies.length) {
        setVisibleButtonMovies(false);
      }
    } else {
      setSavedFiltredMovieList((prevValue) => [...prevValue, ...nextMoviesLength]);
      if (currentMoviesLength + nextMoviesLength.length >= filtredMovies.length) {
        setVisibleButtonSaved(false);
      }
    }
  }

  // Сохранение фильма API
  const handleSavedMovie = async (movieData) => {
    try {
      setLoading(true)
      const response = await mainApi.saveMovie(movieData);
      setSavedMovieList([...savedMovieList, response]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // Удаление фильма из сохраненных
  const handleDeleteMovie = async (movieId) => {
    mainApi.deleteMovie(movieId)
      .then(res => {
        setSavedMovieList((state) => state.filter((movie) => movie._id !== res._id));
        setSavedFiltredMovieList((state) => state.filter((movie) => movie._id !== res._id));
      })
      .then(() => localStorage.setItem(FILTRED_SAVED_MOVIES, JSON.stringify(savedMovieList)))
      .catch((err) => console.log(err))
  }

  // Свитч кнопки лайка API
  const switchLikeMovie = (movieData, movieId, checkLike) => {
    if (!checkLike) {
      handleSavedMovie(movieData);
    } else {
      const { _id } = savedMovieList.find((item) => item.movieId === movieId);
      handleDeleteMovie(_id);
    }
  }

  // Получение данных для контекста
  const handleCheckLogin = useCallback(async () => {
    if (isLoggedIn) {
      try {
        const response = await mainApi.getUserInfo();
        setCurrentUser(response);
      } catch (err) {
        console.log(err);
      }
    }
  }, [isLoggedIn])

  // Проверка токена в куках
  const handleCheckToken = useCallback(async () => {
    if (!isLoggedIn) {
      try {
        await mainApi.checkToken();
        setLoggedIn(true);
        navigate('/movies');
      } catch(err) {
        console.log(err);
      }
    } 
  }, [isLoggedIn, navigate])

  // Редактирование профиля API
  const handleUpdateUser = async (userData) => {
    try {
      delete userData._id;
      const response = await mainApi.updateUser(userData);
      setOpen(true);
      setCurrentUser(response);
      setErrorMessage('');
    } catch (err) {
      if (err.statusCode === 400) setErrorMessage('Некорректно заполнено поле email');
      else setErrorMessage(err.message);
    }
  }

  // Регистрация API
  const handleSignUp = async (userData) => {
    try {
      await mainApi.signUp(userData);
      setLoggedIn(true);
      setErrorMessage('');
      navigate('/movies', {replace: true});
    } catch (err) {
      if (err.statusCode === 400) setErrorMessage('Некорректно заполнено поле email');
      else setErrorMessage(err.message);
    }
  }

  // Логин API
  const handleSignIn = async (userData) => {
    try {
      delete userData.name;
      await mainApi.signIn(userData);
      setLoggedIn(true);
      setErrorMessage('');
      navigate('/movies', {replace: true});
    } catch (err) {
      if (err.statusCode === 400) setErrorMessage('Некорректно заполнено поле email');
      else setErrorMessage(err.message);
    }
  }

  // Выход API
  const handleLogOut = async () => {
    try {
      await mainApi.logOut();
      setLoggedIn(false);
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  const handleClosePopup = () => setOpen(false)

  useEffect(() => {
    handleCheckLogin();
  }, [handleCheckLogin])

  useEffect(() => {
    handleCheckToken()
  }, [handleCheckToken])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={
          <>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </>
        }/>
        <Route path='/movies' element={
          //Роут - фильмы
          <ProtectedRoute isLoggedIn={isLoggedIn} element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <SearchForm onSearch={handleSearchMovies} movieList={movieList} movieListFiltred={visibleMovieList} onCheckbox={handleFilterMovies}/>
              <MoviesCardList
                movieList={visibleMovieList}
                showMovieList={showMovieList} 
                savedMovieList={savedMovieList}
                showSavedMovieList={showSavedMovieList} 
                handleShowButton={handleShowButton}
                switchLikeMovie={switchLikeMovie}
                isVisibleButton={isVisibleButtonMovies}
                storageName={FILTRED_MOVIES}
                isLoading={isLoading}
                />
              <Footer />
            </>
          }/>
        }/>
        <Route path='/saved-movies' element={
          //Роут - сохраненные фильмы
          <ProtectedRoute isLoggedIn={isLoggedIn} element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <SearchForm onSearch={handleSearchMovies} movieList={savedMovieList} movieListFiltred={savedFiltredMovieList} onCheckbox={handleFilterMovies}/>
              <MoviesCardList 
                movieList={savedFiltredMovieList} 
                savedMovieList={savedMovieList} 
                showSavedMovieList={showSavedMovieList} 
                handleDeleteMovie={handleDeleteMovie}
                handleShowButton={handleShowButton}
                isVisibleButton={isVisibleButtonSaved}
                storageName={FILTRED_SAVED_MOVIES}
                isLoading={isLoading}
              />
              <Footer />
            </>
          }/>
        }/>
        <Route path='/profile' element={
          //Роут - профиль
          <ProtectedRoute isLoggedIn={isLoggedIn} element={
            <>
              <Header isLoggedIn={isLoggedIn} />
              <Profile onSubmit={handleUpdateUser} onLogOut={handleLogOut} errorMessage={errorMessage}/>
              <SuccessPopup isOpen={isOpen} onClose={handleClosePopup} text={'Вы успешно изменили данные'}/>
            </>
          }/>
        }/>
        <Route path='/signin' element={ <AuthForm onSubmit={handleSignIn} errorMessage={errorMessage} /> }/>
        <Route path='/signup' element={ <AuthForm onSubmit={handleSignUp} errorMessage={errorMessage} /> }/>
        <Route path='*' element={ <NotFound /> }/>
      </Routes>
    </CurrentUserContext.Provider>
  );
};

