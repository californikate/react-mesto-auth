import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupDeleteConfirm from './PopupDeleteConfirm';
import ImagePopup from './ImagePopup';
import { CurrenUserContext } from '../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '' });
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    api.getInitialCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    api.getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
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
    setSelectedCard(null)
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

  return (
    <CurrenUserContext.Provider value={ currentUser }>
      <div className="root">
        <div className="page">
          <Header />
          <Main 
            onEditAvatar={ handleEditAvatarClick }
            onEditProfile={ handleEditProfileClick }
            onAddPlace={ handleAddPlaceClick }
            onCardClick={ handleCardClick }
            onCardLike={ handleCardLike }
            onCardDelete={ handleCardDelete }
            cards={ cards }
          />
          <Footer />
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