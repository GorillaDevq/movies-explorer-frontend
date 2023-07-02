import { useState, useEffect } from "react";

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  //Установка стейт переменных в инпутах
  const handleChange = (event) => {
    const target = event.target;
    const { name, value } = target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  //Проверка на валидность формы
  useEffect(() => {
    const isErrorEmpty = Object.values(errors).every((err) => err === '');
    setIsValid(isErrorEmpty);
  }, [errors]);

  return { values, handleChange, errors, isValid, setValues};
}