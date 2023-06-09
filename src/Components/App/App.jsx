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
import { 
  FILTRED_MOVIES, 
  FILTRED_SAVED_MOVIES,
  VALIDATION_ERROR_MESSAGE,
  NULL_FILM,
  VALIDATION_ERROR,
  IS_LOGGED_IN,
} from '../../utils/constants/constants';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setLoggedIn] = useState(false)

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
  const [isLoading, setLoading] = useState(false)


  const { handleSearchMovies, 
    handleFilterMovies, 
    visibleMovieList,
    setVisibleMovieList,
    isVisibleButtonMovies,
    setVisibleButtonMovies,
    savedFiltredMovieList,
    setSavedFiltredMovieList,
    isVisibleButtonSaved,
    setVisibleButtonSaved,
  } = useSearchMovies(moviesPerRows, setLoading)

  // Получение всех фильмов API
  const showMovieList = useCallback(async () => {
    let filtredMovies = localStorage.getItem(FILTRED_MOVIES)
    if (filtredMovies) {
      filtredMovies = JSON.parse(filtredMovies);
      setVisibleMovieList(filtredMovies.movies.slice(NULL_FILM, moviesPerRows))
      if (filtredMovies.length > moviesPerRows) setVisibleButtonMovies(true);
      else setVisibleButtonMovies(false);
    }
    try {
      const response = await moviesApi.getInitialsMovies();
      setMovieList(response)
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [moviesPerRows, setVisibleMovieList, setVisibleButtonMovies])

  // Получение сохраненных фильмов API
  const showSavedMovieList = useCallback(async () => {
    try {
      const response = await mainApi.getSavedMovie();
      setSavedMovieList(response);
      localStorage.setItem(FILTRED_SAVED_MOVIES, JSON.stringify({ movies: response, checkbox: false, searchValue: ''}));
      setSavedFiltredMovieList(response.slice(NULL_FILM, moviesPerRows));
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
    const nextMoviesLength = filtredMovies.movies.slice(currentMoviesLength, currentMoviesLength + moviesPerAdd);
    if (location.pathname === '/movies') {
      setVisibleMovieList((prevValue) => [...prevValue, ...nextMoviesLength]);
      if (currentMoviesLength + nextMoviesLength.length >= filtredMovies.movies.length) {
        setVisibleButtonMovies(false);
      }
    } else {
      setSavedFiltredMovieList((prevValue) => [...prevValue, ...nextMoviesLength]);
      if (currentMoviesLength + nextMoviesLength.length >= filtredMovies.movies.length) {
        setVisibleButtonSaved(false);
      }
    }
  }

  // Сохранение фильма API
  const handleSavedMovie = async (movieData) => {
    try {
      const response = await mainApi.saveMovie(movieData);
      setSavedMovieList([...savedMovieList, response]);
    } catch (err) {
      console.log(err);
    }
  }

  // Удаление фильма из сохраненных
  const handleDeleteMovie = async (movieId) => {
    mainApi.deleteMovie(movieId)
      .then(res => {
        setSavedMovieList((state) => state.filter((movie) => movie._id !== res._id));
        setSavedFiltredMovieList((state) => state.filter((movie) => movie._id !== res._id));
      })
      .then(() => localStorage.setItem(FILTRED_SAVED_MOVIES, JSON.stringify({ movies: savedMovieList, checkbox: false})))
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
  const handleGetUserInfo = useCallback(async () => {
    if (isLoggedIn) {
      try {
        const response = await mainApi.getUserInfo();
        setCurrentUser(response);
      } catch (err) { 
        if (err.message === 'Ошибка авторизации.') setLoggedIn(false)
        else console.log(err);
      }
    }
  }, [isLoggedIn])

  // Проверка токена в куках
  const handleCheckToken = useCallback(async () => {
    try {
      await mainApi.checkToken();
      setLoggedIn(true);
    } catch(err) {
      setLoggedIn(false);
      console.log(err);
    }
  }, [])

  // Редактирование профиля API
  const handleUpdateUser = async (userData) => {
    try {
      delete userData._id;
      const response = await mainApi.updateUser(userData);
      setOpen(true);
      setCurrentUser(response);
      setErrorMessage('');
    } catch (err) {
      if (err.statusCode === VALIDATION_ERROR) setErrorMessage(VALIDATION_ERROR_MESSAGE);
      else setErrorMessage(err.message);
    }
  }

  // Регистрация API
  const handleSignUp = async (userData) => {
    try {
      await mainApi.signUp(userData);
      setLoggedIn(true);
      setErrorMessage('');
      localStorage.setItem(IS_LOGGED_IN, JSON.stringify(true));
      navigate('/movies', {replace: true});
    } catch (err) {
      if (err.statusCode === VALIDATION_ERROR) setErrorMessage(VALIDATION_ERROR_MESSAGE);
      else setErrorMessage(err.message);
    }
  }

  // Логин API
  const handleSignIn = async (userData) => {
    try {
      delete userData.name;
      await mainApi.signIn(userData);
      localStorage.setItem(IS_LOGGED_IN, JSON.stringify(true));
      setLoggedIn(true);
      setErrorMessage('');
      navigate('/movies', {replace: true});
    } catch (err) {
      if (err.statusCode === VALIDATION_ERROR) setErrorMessage(VALIDATION_ERROR_MESSAGE);
      else setErrorMessage(err.message);
    }
  }

  // Выход API
  const handleLogOut = () => {
    mainApi.logOut()
      .then(() => {
        navigate('/');
        localStorage.clear();
        setLoggedIn(false);
        setCurrentUser({});
        setSavedMovieList([]);
        setVisibleMovieList([]);
        setMovieList([]);
        setSavedFiltredMovieList([]);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleClosePopup = () => setOpen(false)

  useEffect(() => {
    handleGetUserInfo();
  }, [handleGetUserInfo])

  useEffect(() => {
    handleCheckToken()
  }, [handleCheckToken])

  useEffect(() => {
    setErrorMessage('')
  }, [])

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
              <SearchForm onSearch={handleSearchMovies} movieList={movieList} movieListFiltred={visibleMovieList} onCheckbox={handleFilterMovies} storageName={FILTRED_MOVIES} />
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
                setLoading={setLoading}
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
              <SearchForm onSearch={handleSearchMovies} movieList={savedMovieList} movieListFiltred={savedFiltredMovieList} onCheckbox={handleFilterMovies} storageName={FILTRED_SAVED_MOVIES} />
              <MoviesCardList 
                movieList={savedFiltredMovieList} 
                savedMovieList={savedMovieList} 
                showSavedMovieList={showSavedMovieList} 
                handleDeleteMovie={handleDeleteMovie}
                handleShowButton={handleShowButton}
                isVisibleButton={isVisibleButtonSaved}
                storageName={FILTRED_SAVED_MOVIES}
                isLoading={isLoading}
                setLoading={setLoading}
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
              <Profile onSubmit={handleUpdateUser} onLogOut={handleLogOut} errorMessage={errorMessage} onSetError={setErrorMessage}/>
              <SuccessPopup isOpen={isOpen} onClose={handleClosePopup} text={'Вы успешно изменили данные'}/>
            </>
          }/>
        }/>
        <Route path='/signin' element={ <AuthForm onSubmit={handleSignIn} errorMessage={errorMessage} onSetError={setErrorMessage} isLoggedIn={isLoggedIn} /> }/>
        <Route path='/signup' element={ <AuthForm onSubmit={handleSignUp} errorMessage={errorMessage} onSetError={setErrorMessage} isLoggedIn={isLoggedIn} /> }/>
        <Route path='*' element={ <NotFound isLoggedIn={isLoggedIn} /> }/>
      </Routes>
    </CurrentUserContext.Provider>
  );
};

