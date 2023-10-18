import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import Login from './Login';
import Register from './Register';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { authorisedApi } from '../utils/api';

import CurrentUserContext from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';

function App() {
  // Состояния
  const [isLoading, setIsLoading] = React.useState(true);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipCorrect, setIsInfoTooltipCorrect] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditAvatarLoading, setIsEditAvatarLoading] = React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAddPlaceLoading, setIsAddPlaceLoading] = React.useState(false);

  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = React.useState(false);
  const [isDeletePlaceLoading, setIsDeletePlaceLoading] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const [selectedCard, setSelectedCard] = React.useState({});

  // Popup 

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleSignUpResult(isCorrect) {
    setIsInfoTooltipCorrect(isCorrect);
    setIsInfoTooltipOpen(true);
  }

  function handleSignInResult(isCorrect) {
    setIsInfoTooltipCorrect(isCorrect);
    setIsInfoTooltipOpen(true);

    if (isCorrect) {
      fetchInitialData();
    }
  }

  // Card

  function handlePlaceClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);

    if (isLiked) {
      authorisedApi.deleteCardLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      authorisedApi.setCardLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
        })
        .catch(error => {
          console.log(error);
        });
    }
  } 

  function handleCardDelete(card) {
    setDeletedCard(card);
    setIsDeletePlacePopupOpen(true);
  }

  function handlePopupDeleteCard(event) {
    event.preventDefault();

    setIsDeletePlaceLoading(true);

    authorisedApi.deleteCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter(oldCard => oldCard._id !== deletedCard._id);
        setCards(newCards);
        setIsDeletePlacePopupOpen(false);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsDeletePlaceLoading(false);
      });
  }

  // User

  function handleUpdateUser(user) {
    setIsEditProfileLoading(true);

    authorisedApi.setUserInfo(user.name, user.about)
      .then((newUser) => {
        setCurrentUser(newUser.data);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsEditProfileLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsEditAvatarLoading(true);

    authorisedApi.setAvatar(avatar)
      .then((newUser) => {
        setCurrentUser(newUser.data);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsEditAvatarLoading(false);
      });
  }

  // Place 

  function handleAddPlaceSubmit(card) {
    setIsAddPlaceLoading(true);

    authorisedApi.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsAddPlaceLoading(false);
      });
  }

  // Common

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setIsInfoTooltipOpen(false)

    setSelectedCard({});
  }

  function handleEscClose(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      closeAllPopups();
    }
  }

  // Жизненный цикл реакт компонента

  function fetchInitialData() {
    Promise.all([
      authorisedApi.getUserInfo(),
      authorisedApi.getUserInfo(),
      authorisedApi.getInitialCards(),
    ]) 
    .then(([emailUserInfo, initialUserInfo, initialCards]) => {
      setEmail(emailUserInfo.data.email)
      setCurrentUser(initialUserInfo.data);
      setCards(initialCards.data);
    }) 
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      fetchInitialData();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, isDeletePlacePopupOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <BrowserRouter>
            <Header email={email}/>
            <Routes>
              <Route 
                path="/sign-in"
                element={<Login onSignInResult={handleSignInResult}/>} 
              />
              <Route 
                path="/sign-up" 
                element={<Register onSignUpResult={handleSignUpResult} />} 
              />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute
                    element={Main} 
                    isLoading={isLoading}
                    cards={cards}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCard={handlePlaceClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                } 
              />
            </Routes>
          </BrowserRouter>
          
          <Footer />
        </div>

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          isLoading={isEditAvatarLoading}
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        />

        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          isLoading={isEditProfileLoading}
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen} 
          isLoading={isAddPlaceLoading}
          onClose={closeAllPopups} 
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm 
          name="delete-place" 
          title="Вы уверены?" 
          buttonText={isDeletePlaceLoading ? "Удаление..." : "Да"}
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handlePopupDeleteCard}
        />

        <ImagePopup 
          card={selectedCard} 
          isOpen={Object.keys(selectedCard).length > 0} 
          onClose={closeAllPopups} 
        />

        <InfoTooltip 
          isCorrect={isInfoTooltipCorrect}
          isOpen={isInfoTooltipOpen} 
          onClose={closeAllPopups} 
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
