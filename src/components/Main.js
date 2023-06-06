import React, { useContext } from "react";
import Card from "./Card";
import { CurrenUserContext } from "../contexts/CurrentUserContext";

function Main({ 
  onEditAvatar, 
  onEditProfile, 
  onAddPlace, 
  onCardClick, 
  onCardLike, 
  onCardDelete, 
  cards 
}) {

  const currentUser = useContext(CurrenUserContext);

  return (
    <main className="main">
        <section className="profile" aria-label="профиль">
          <div className="profile__info">
            <button 
              onClick={ onEditAvatar } 
              type="button" 
              className="profile__avatar-button button" 
              aria-label="редактировать аватар"
            >
              <img 
                src={ currentUser.avatar } 
                className="profile__avatar" 
                alt="аватар пользователя." 
              />
            </button>
            <div className="profile__container">
              <div className="profile__name">
                <h1 className="profile__title">{ currentUser.name }</h1>
                <button 
                  onClick={ onEditProfile } 
                  type="button" 
                  className="profile__edit-button button" 
                  aria-label="редактировать профиль" 
                />
              </div>
              <p className="profile__subtitle">{ currentUser.about }</p>
            </div>
          </div>
          <button 
            onClick={ onAddPlace } 
            type="button" 
            className="profile__add-button button" 
            aria-label="добавить новую карточку" 
          />
        </section>
        <section className="elements" aria-label="карточки мест">
          <ul className="elements__items">
            {cards.map((card) => (
              <Card 
                key={ card._id } 
                card={ card } 
                onCardClick={ onCardClick }
                onCardLike={ onCardLike }
                onCardDelete={ onCardDelete }
              />
            ))}
          </ul>
        </section>
      </main>
  )
}

export default Main;