import { useState, useEffect } from "react";

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import { CurrenUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import * as auth from "../utils/Auth";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupDeleteConfirm from "./PopupDeleteConfirm";
import ImagePopup from "./ImagePopup";

import InfoTooltip from "./InfoTooltip";
import Authorization from "./Authorization";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '' });
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState('');

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isInfoTooltipOpen;

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err));
    }   
  }, [loggedIn]);
  
  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    handleTokenCheck();
  }, []);


  useEffect(() => {
    function isOverlay(e) {
      if (e.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', isOverlay);
      document.addEventListener('keydown', handleEscClose);

      return () => {
        document.removeEventListener('mousedown', isOverlay);
        document.removeEventListener('keydown', handleEscClose);
      }
    }
  }, [isOpen]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCards(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(items) {
    setIsLoading(true);

    api.setUserInfo(items)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(item) {
    setIsLoading(true);

    api.setUserAvatar(item)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(items) {
    setIsLoading(true);

    api.addNewCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleRegister({ email, password }) {
    auth.register(email, password)
      .then(() => {
        navigate('/sign-in');
        handleOpenTooltip(true, 'Вы успешно зарегистрировались!');
      })
      .catch((err) => {
        handleOpenTooltip(false, 'Упс! Что-то пошло не так. Попробуйте ещё раз.');
        console.log(err);
      })
  }

  function handleAuthorize({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setEmail(email);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        handleOpenTooltip(false, 'Упс! Что-то пошло не так. Попробуйте ещё раз.');
        console.log(err);
      })
  }
  
  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail('');
    setCurrentUser({});
    navigate('/sign-in');
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('token');

    if(token) {
      auth.getContent(token)
        .then(({data}) => {
          setEmail(data.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          handleOpenTooltip(false, 'Упс! Что-то пошло не так. Попробуйте ещё раз.');
          console.log(err);
        })
    }
  }

  function handleOpenTooltip(isSuccess, message) {
    setIsSuccess(isSuccess);
    setMessage(message);
    setIsInfoTooltipOpen(true);
  }

  return (
    <CurrenUserContext.Provider value={ currentUser }>
      <div className="root">
        <div className="page">
          <Header 
            loggedIn={ loggedIn }
            email={ email }
            handleLogout={ handleLogout }
          />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute
                loggedIn={ loggedIn }
                element={ Main }
                onEditAvatar={ handleEditAvatarClick }
                onEditProfile={ handleEditProfileClick }
                onAddPlace={ handleAddPlaceClick }
                onCardClick={ handleCardClick }
                onCardLike={ handleCardLike }
                onCardDelete={ handleCardDelete }
                cards={ cards }
              />
            }/>
            <Route path="/sign-up" element={ 
              <Authorization 
                handleRegister={ handleRegister }
                authTitle={ "Регистрация" }
                buttonText={ "Зарегистрироваться" }
                linkText={ "Уже зарегистрированы? Войти" }
              />
            }/>
            <Route path="/sign-in" element={ 
              <Authorization 
                handleAuthorize={ handleAuthorize }
                authTitle={ "Вход" }
                buttonText={ "Войти" }
                linkText={ "Еще не зарегистрированы? Зарегистрироваться" }
              />
            }/>
            <Route path="*" element={ 
              loggedIn ? ( <Navigate to="/" replace /> ) : ( <Navigate to="/sign-in" replace /> )
            }/>
          </Routes>
          
          {loggedIn && <Footer />}

          <InfoTooltip
            isOpen={ isInfoTooltipOpen }
            onClose={ closeAllPopups }
            isSuccess={ isSuccess }
            message={ message }
          />
          <EditProfilePopup 
            isOpen={ isEditProfilePopupOpen } 
            onClose={ closeAllPopups } 
            onUpdateUser={ handleUpdateUser }
            isLoading={ isLoading }
          />
          <EditAvatarPopup 
            isOpen={ isEditAvatarPopupOpen } 
            onClose={ closeAllPopups } 
            onUpdateAvatar={ handleUpdateAvatar }
            isLoading={ isLoading }
          />
          <AddPlacePopup 
            isOpen={ isAddPlacePopupOpen } 
            onClose={ closeAllPopups } 
            onAddPlace={ handleAddPlaceSubmit }
            isLoading={ isLoading }
          />
          <PopupDeleteConfirm />
          <ImagePopup card={ selectedCard } onClose={ closeAllPopups }/>
        </div>
      </div>
    </CurrenUserContext.Provider>
  );
}

export default App;