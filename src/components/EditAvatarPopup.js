import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  } 

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm 
      isOpen={ isOpen }
      onClose= { onClose }
      onSubmit={ handleSubmit }
      isLoading={ isLoading }
      name="avatar"
      title="Обновить аватар"
      buttonText={ isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input 
        ref={ inputRef }
        type="url" 
        name="avatar" 
        id="avatar-input" 
        placeholder="Ссылка на аватар" 
        required 
        className="popup__input popup__input_type_place"
      />
      <span id="avatar-input-error" className="popup__input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;