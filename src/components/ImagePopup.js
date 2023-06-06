import React from "react";

function ImagePopup({ card, onClose }) {

  return (
    <div className={`popup image-popup ${card ? 'popup_opened' : ''}`}>
      <div className="popup__image-container">
        <figure className="popup__figure">
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <figcaption className="popup__caption">{card ? card.name : ''}</figcaption>
        </figure>
        <button 
          onClick={ onClose } 
          type="button" 
          className="popup__close-button button" 
          aria-label="закрыть большую картинку" 
        />
      </div>
    </div>
  )
}

export default ImagePopup;