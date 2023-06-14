import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const cardNameRef = useRef(null);
  const cardLinkRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      place: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  useEffect(() => {
    cardNameRef.current.value = '';
    cardLinkRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={ isOpen }
      onClose= { onClose }
      onSubmit={ handleSubmit }
      isLoading={ isLoading }
      name="add"
      title="Новое место"
      buttonText={ isLoading ? 'Создание...' : 'Создать'}
    >
      <input 
        ref={ cardNameRef }
        type="text" 
        name="place" 
        id="place-input" 
        placeholder="Название" 
        required 
        minLength="2" 
        maxLength="30" 
        className="popup__input popup__input_type_place"
      />
      <span id="place-input-error" className="popup__input-error" />
      <input 
        ref={ cardLinkRef }
        type="url" 
        name="link" 
        id="url-input" 
        placeholder="Ссылка на картинку" 
        required
        className="popup__input popup__input_type_url"
      />
      <span id="url-input-error" className="popup__input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;