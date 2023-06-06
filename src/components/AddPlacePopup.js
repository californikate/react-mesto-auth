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

  // <div className="popup add-popup">
  //     <div className="popup__container">
  //       <button type="button" className="popup__close-button button" aria-label="закрыть добавление карточки"></button>
  //       <form id="add-profile" action="#" name="add-profile" className="popup__form-element" noValidate>
  //         <h2 className="popup__title">Новое место</h2>
  //         <input type="text" name="place" id="place-input" placeholder="Название" required minLength={2} maxLength={30} className="popup__input popup__input_type_place" />
  //         <span id="place-input-error" className="popup__input-error" />
  //         <input type="url" name="link" id="url-input" placeholder="Ссылка на картинку" required className="popup__input popup__input_type_url" />
  //         <span id="url-input-error" className="popup__input-error" />
  //         <button type="submit" className="popup__save-button" aria-label="создать карточку">Создать</button>
  //       </form>
  //     </div>
  //   </div>