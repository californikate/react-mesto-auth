import React from "react";
import { CurrenUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrenUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'} button` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="element">
      {isOwn && 
        <button 
          onClick={ handleDeleteClick } 
          type="button" 
          className="element__delete-button button" 
          aria-label="удалить карточку" 
        />
      }
      <img 
        onClick={ handleClick } 
        className="element__photo" 
        src={ card.link }
        alt={ card.name } 
      />
      <div className="element__info">
        <h2 className="element__title">{ card.name }</h2>
        <div>
          <button 
            onClick={ handleLikeClick } 
            type="button" 
            className={ cardLikeButtonClassName } 
            aria-label="поставить лайк" 
          />
          <p className="element__like-counter">{ card.likes.length }</p>
        </div>
      </div>
    </li>
  )
}

export default Card;