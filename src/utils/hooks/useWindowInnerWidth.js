import { useState, useEffect } from "react";

import { 
  DESKTOP_WIDTH, 
  LAPTOP_WIDTH,
  MAX_PHONE_WIDTH,
  MIN_PHONE_WIDTH,
  DESKTOP_MOVIES_PER_ROWS,
  DESKTOP_MOVIES_ADD,
  LAPTOP_MOVIES_PER_ROWS,
  LAPTOP_MOVIES_ADD,
  PHONE_MOVIES_PER_ROWS,
  PHONE_MOVIES_ADD,
  RESIZE_TIMER,
} from "../constants/constants";

export default function useWindowInnerWidth() {
  // Стейты для отрисовки количества Фильмов
  const [moviesPerRows, setMoviesPerRows] = useState(0);
  const [moviesPerAdd, setMoviesPerAdd] = useState(0);

  const handleResize = (resizeTimer) => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
    const screenWidth = window.innerWidth;

    let movies;
    let moviesAdd;
    if (screenWidth >= DESKTOP_WIDTH) {
      movies = DESKTOP_MOVIES_PER_ROWS;
      moviesAdd = DESKTOP_MOVIES_ADD;
    } else if (screenWidth >= LAPTOP_WIDTH) {
      movies = LAPTOP_MOVIES_PER_ROWS;
      moviesAdd = LAPTOP_MOVIES_ADD;
    }
    else if (screenWidth >= MIN_PHONE_WIDTH && screenWidth <= MAX_PHONE_WIDTH) {
      movies = PHONE_MOVIES_PER_ROWS;
      moviesAdd = PHONE_MOVIES_ADD;
    }

    setMoviesPerRows(movies);
    setMoviesPerAdd(moviesAdd);
    }, RESIZE_TIMER)
  };

  // Монтирование и размонтирование
  useEffect(() => {
    let resizeTimer;
    handleResize(resizeTimer);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  return { moviesPerRows, moviesPerAdd }
}