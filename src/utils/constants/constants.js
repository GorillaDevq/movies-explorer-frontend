const FILTRED_MOVIES = 'filtredMovies';
const FILTRED_SAVED_MOVIES = 'filtredSavedMovies';
const IS_LOGGED_IN = 'isLogedIn';

const VALIDATION_ERROR = 400;
const VALIDATION_ERROR_MESSAGE = 'Некорректно заполнено поле email';


const SHORT_FILM_DURATION = 40;
const NULL_FILM = 0;

const DESKTOP_WIDTH = 1280;
const LAPTOP_WIDTH = 768;
const MAX_PHONE_WIDTH = 500;
const MIN_PHONE_WIDTH = 310;

const DESKTOP_MOVIES_PER_ROWS = 12;
const DESKTOP_MOVIES_ADD = 3;

const LAPTOP_MOVIES_PER_ROWS = 8;
const LAPTOP_MOVIES_ADD = 2;

const PHONE_MOVIES_PER_ROWS = 5;
const PHONE_MOVIES_ADD = 1;

const RESIZE_TIMER = 250;

const EMAIL_REGEX= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Zа-яА-Я\s-]+$/;

export { FILTRED_MOVIES, 
  FILTRED_SAVED_MOVIES,
  VALIDATION_ERROR_MESSAGE,
  SHORT_FILM_DURATION,
  NULL_FILM,
  VALIDATION_ERROR,
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
  EMAIL_REGEX,
  NAME_REGEX,
  IS_LOGGED_IN,
}