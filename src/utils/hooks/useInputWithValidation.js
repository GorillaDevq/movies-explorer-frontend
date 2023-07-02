import { useState, useEffect } from "react";

export function useEmptyValidation(value) {
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(value ? true : false)
  }, [value])

  return isEmpty
}

export function useRegexValidation (value) {
  const [isErrorRegex, setErrorRegex] = useState('');

  useEffect(() => {
    const isValid = /^[a-zA-Zа-яА-Я\s-]+$/.test(value);
    if (!isValid) setErrorRegex('Допустимые знаки: латиница, кириллица, пробел или дефис');
    else setErrorRegex('');
  }, [value])

  return isErrorRegex
}