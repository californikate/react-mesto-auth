import React from "react";
import authSuccess from "../images/auth-success.svg";
import authError from "../images/auth-error.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button 
          onClick={ onClose }
          type="button" 
          className="popup__close-button button" 
          aria-label="закрыть окно"
        />
        <img 
          src={ isSuccess ? authSuccess : authError } 
          alt="Статус регистрации" 
          className="popup__image-status" 
        />
        <p className="popup__text-status">{ message }</p>
      </div>
    </div>
  )
}

export default InfoTooltip;