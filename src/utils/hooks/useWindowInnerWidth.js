import { useState, useEffect } from "react";

export default function useWindowInnerWidth() {
  // Стейты для отрисовки количества Фильмов
  const [moviesPerRows, setMoviesPerRows] = useState(0);
  const [moviesPerAdd, setMoviesPerAdd] = useState(0);

  const handleResize = (resizeTimer) => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
    const screenWidth = window.innerWidth;

    let movies = 3;
    let moviesAdd = 1;
    if (screenWidth >= 1280) {
      movies = 12;
      moviesAdd = 3;
    } else if (screenWidth >= 768) {
      movies = 8;
      moviesAdd = 2;
    }
    else if (screenWidth >= 310 && screenWidth <= 500) {
      movies = 5;
      moviesAdd = 1;
    }

    setMoviesPerRows(movies);
    setMoviesPerAdd(moviesAdd);
    }, 250)
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