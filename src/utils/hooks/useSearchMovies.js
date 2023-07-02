import { useState } from "react";
import { useLocation } from "react-router-dom";

import { FILTRED_MOVIES, FILTRED_SAVED_MOVIES } from "../constants/constants";

export default function useSearchMovies(moviesPerRows) {
  const location = useLocation();

  const [visibleMovieList, setVisibleMovieList] = useState([]);
  const [isVisibleButtonMovies, setVisibleButtonMovies] = useState(false);

  const [savedFiltredMovieList, setSavedFiltredMovieList] = useState([]);
  const [isVisibleButtonSaved, setVisibleButtonSaved] = useState(false);

  const handleFilterResult = (filtredMovies) => {
    if (location.pathname === '/movies') {
      localStorage.setItem(FILTRED_MOVIES, JSON.stringify(filtredMovies));
      setVisibleMovieList(filtredMovies.slice(0, moviesPerRows))
      if (filtredMovies.length > moviesPerRows) setVisibleButtonMovies(true);
      else setVisibleButtonMovies(false);
    } else {
      localStorage.setItem(FILTRED_SAVED_MOVIES, JSON.stringify(filtredMovies));
      setSavedFiltredMovieList(filtredMovies.slice(0, moviesPerRows));
      if (filtredMovies.length > moviesPerRows) setVisibleButtonSaved(true);
      else setVisibleButtonSaved(false);
    }
    return
  }

  const handleSearchMovies = (search, checkbox, arrayMovies) => {
    const searchLowerCase = search.toLowerCase();
    const filtredMovies = arrayMovies.filter((movie) => {
      const movieNameLowerCase = movie.nameRU.toLowerCase();
      if (checkbox) {
        return movieNameLowerCase.includes(searchLowerCase) && movie.duration <= 40
      }
      else {
        return movieNameLowerCase.includes(searchLowerCase)
      }
    }) 
    handleFilterResult(filtredMovies)
  }

  const handleFilterMovies = (arrayMovies, checkbox) => {
    const filtredMovies = arrayMovies.filter((movie) => {
      if (checkbox) {
        return movie.duration <= 40
      }
      else {
        return movie
      }
    })
    handleFilterResult(filtredMovies)
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
    setVisibleButtonSaved
  }
}