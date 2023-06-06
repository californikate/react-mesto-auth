import React from "react";

function PopupWithForm({ 
  name, 
  isOpen, 
  onClose, 
  title, 
  children, 
  buttonText, 
  onSubmit, 
  isLoading 
}) {
  return (
    <div className={`popup ${name}-popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button 
          onClick={ onClose }
          type="button" 
          className="popup__close-button button" 
          aria-label="закрыть редактирование профиля"
        />
        <form 
          onSubmit={ onSubmit }
          id={`form-${name}`} 
          action="#" 
          name={`form-${name}`} 
          className="popup__form-element" 
          //noValidate
        >
          <h2 className="popup__title">{ title }</h2>
          { children }
          <button 
            disabled={ isLoading }
            type="submit" 
            className="popup__save-button" 
            aria-label="сохранить изменения профиля"
          >
            { buttonText }
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;