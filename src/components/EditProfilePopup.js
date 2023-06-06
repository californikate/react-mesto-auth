import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrenUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrenUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  // Обработчики изменения инпута обновляют стейт
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={ isOpen }
      onClose= { onClose }
      onSubmit={ handleSubmit }
      isLoading={ isLoading }
      name="edit"
      title="Редактировать профиль"
      buttonText={ isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input 
        value={ name || '' }
        onChange={ handleNameChange }
        type="text" 
        name="name" 
        id="name-input" 
        placeholder="Имя" 
        required 
        minLength="2"
        maxLength="40" 
        className="popup__input popup__input_type_name"
      />
      <span id="name-input-error" className="popup__input-error" />
      <input 
        value={ description || '' }
        onChange={ handleDescriptionChange }
        type="text" 
        name="about" 
        id="job-input" 
        placeholder="О себе" 
        required 
        minLength="2" 
        maxLength="200"
        className="popup__input popup__input_type_job"
      />
      <span id="job-input-error" className="popup__input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;