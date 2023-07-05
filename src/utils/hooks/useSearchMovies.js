import { useState } from "react";
import { useLocation } from "react-router-dom";

import { FILTRED_MOVIES, FILTRED_SAVED_MOVIES, SHORT_FILM_DURATION, NULL_FILM } from "../constants/constants";

export default function useSearchMovies(moviesPerRows, setLoading) {
  const location = useLocation();

  const [visibleMovieList, setVisibleMovieList] = useState([]);
  const [isVisibleButtonMovies, setVisibleButtonMovies] = useState(false);

  const [savedFiltredMovieList, setSavedFiltredMovieList] = useState([]);
  const [isVisibleButtonSaved, setVisibleButtonSaved] = useState(false);

  const handleFilterResult = (filtredMovies , checkbox, search) => {
    if (location.pathname === '/movies') {
      localStorage.setItem(FILTRED_MOVIES, JSON.stringify({movies: filtredMovies, checkbox: checkbox, searchValue: search}));
      setVisibleMovieList(filtredMovies.slice(NULL_FILM, moviesPerRows))
      if (filtredMovies.length > moviesPerRows) setVisibleButtonMovies(true);
      else setVisibleButtonMovies(false);
    } else {
      localStorage.setItem(FILTRED_SAVED_MOVIES, JSON.stringify({movies: filtredMovies, checkbox: checkbox, searchValue: search}));
      setSavedFiltredMovieList(filtredMovies.slice(NULL_FILM, moviesPerRows));
      if (filtredMovies.length > moviesPerRows) setVisibleButtonSaved(true);
      else setVisibleButtonSaved(false);
    }
    setLoading(false);
    return
  }

  const handleSearchMovies = (search, checkbox, arrayMovies) => {
    setLoading(true);
    const searchLowerCase = search.toLowerCase();
    const filtredMovies = arrayMovies.filter((movie) => {
      const movieNameLowerCase = movie.nameRU.toLowerCase();
      if (checkbox) {
        return movieNameLowerCase.includes(searchLowerCase) && movie.duration <= SHORT_FILM_DURATION
      }
      else {
        return movieNameLowerCase.includes(searchLowerCase)
      }
    })
    handleFilterResult(filtredMovies, checkbox, search)
  }

  const handleFilterMovies = (arrayMovies, checkbox, search) => {
    setLoading(true);
    const filtredMovies = arrayMovies.filter((movie) => {
      if (checkbox) {
        return movie.duration <= SHORT_FILM_DURATION
      }
      else {
        return movie
      }
    })
    handleFilterResult(filtredMovies, checkbox, search)
  }

  return { handleSearchMovies, 
    handleFilterMovies, 
    visibleMovieList,
    setVisibleMovieList,
    isVisibleButtonMovies,
    setVisibleButtonMovies,
    savedFiltredMovieList,
    setSavedFiltredMovieList,
    isVisibleButtonSaved,
    setVisibleButtonSaved,
  }
}