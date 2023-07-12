import { useState, useEffect } from "react";

import { NAME_REGEX, EMAIL_REGEX } from "../constants/constants";

export function useEmptyValidation(value) {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(value ? true : false)
  }, [value])

  return isEmpty
}

export function useRegexNameValidation (value) {
  const [isErrorRegex, setErrorRegex] = useState('');

  useEffect(() => {
    const isValid = NAME_REGEX.test(value);
    if (!isValid) setErrorRegex('Допустимые знаки: латиница, кириллица, пробел или дефис');
    else setErrorRegex('');
  }, [value])

  return isErrorRegex
}

export function useRegexEmailValidation () {
  const [isErrorEmailRegex, setErrorEmailRegex] = useState('');

  const handleChangeEmail = (evt) => {
    const { value } = evt.target;
    const isValid = EMAIL_REGEX.test(value);
    if (!isValid) setErrorEmailRegex('Введите корректный адресс электронной почты');
    else setErrorEmailRegex('');
  }

  return { isErrorEmailRegex, handleChangeEmail } 
}