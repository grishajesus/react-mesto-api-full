import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Api from "../utils/api";
import AuthApi from "../utils/auth-api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);

  const [openInfoModal, setOpenInfoModal] = React.useState(false);
  const [registerError, setRegisterError] = React.useState("");

  const handleOpenInfoModal = () => setOpenInfoModal(true);
  const handleCloseInfoModal = () => setOpenInfoModal(false);

  const [currentAuthUser, setCurrentAuthUser] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentUserLoading, setCurrentUserLoading] = React.useState(true);

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setisAddPlacePopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);

    setSelectedCard(null);
  };

  const retrieveUserData = async () => {
    const authUser = await AuthApi.getCurrentUser();

    if (authUser) {
      setCurrentAuthUser(authUser);

      const user = await Api.getCurrentUser();

      setCurrentUser(user);
    }
  };

  const handleLogin = async (payload) => {
    const { email, password } = payload;

    try {
      setCurrentUserLoading(true);

      const response = await AuthApi.login(email, password);

      if (response.token) {
        localStorage.setItem("token", response.token);

        await retrieveUserData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCurrentUserLoading(false);
    }
  };

  const handleRegister = async (payload) => {
    const { email, password } = payload;

    try {
      setRegisterError("");
      await AuthApi.register(email, password);
    } catch (error) {
      console.error(error);
      setRegisterError(error.message);
    } finally {
      handleOpenInfoModal();
    }
  };

  const handleLogout = () => {
    localStorage.setItem("token", null);

    setCurrentAuthUser(null);
    setCurrentUser(null);
  };

  const handleUpdateUser = async (data) => {
    try {
      const updatedUser = await Api.updateUser(data);

      setCurrentUser(updatedUser);

      closeAllPopups();
    } catch (error) {
      console.error("handleUpdateUser", error);
    }
  };

  const handleUpdateAvatar = async (data) => {
    const { avatar } = data;

    try {
      const updatedUser = await Api.updateUserAvatar(avatar);

      setCurrentUser(updatedUser);

      closeAllPopups();
    } catch (error) {
      console.error("handleUpdateAvatar", error);
    }
  };

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((like) => like === currentUser._id);

    try {
      const { data: newCard } = await Api.changeLikeCardStatus(card._id, isLiked);

      setCards((state) =>
        state.map((stateCard) =>
          stateCard._id === card._id ? newCard : stateCard
        )
      );
    } catch (error) {
      console.error("handleCardLike", error);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await Api.deleteCard(card._id);

      setCards((state) =>
        state.filter((stateCard) => stateCard._id !== card._id)
      );
    } catch (error) {
      console.error("handleCardDelete", error);
    }
  };

  const handleAddPlaceSubmit = async (data) => {
    try {
      const newCard = await Api.createCard(data);

      setCards((state) => [newCard, ...state]);

      closeAllPopups();
    } catch (error) {
      console.error("handleAddPlaceSubmit", error);
    }
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        setCurrentUserLoading(true);

        await retrieveUserData();
      } catch (error) {
        console.error("fetchUserData error", error);
      } finally {
        setCurrentUserLoading(false);
      }
    };

    fetchUserData();
  }, []);

  React.useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsData = await Api.getPlaces();

        setCards(cardsData);
      } catch (error) {
        console.error("fetchCards error", error);
      }
    };

    fetchCards();
  }, []);

  if (currentUserLoading) {
    return null;
  }

  return (
    <CurrentUserContext.Provider
      value={{ authUser: currentAuthUser, currentUser }}
    >
      <BrowserRouter>
        <div className="root">
          <Header onLogout={handleLogout} />

          <Routes>
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                currentAuthUser ? (
                  <Navigate replace to="/" />
                ) : (
                  <Navigate replace to="/sign-in" />
                )
              }
            />
          </Routes>

          {currentAuthUser ? <Footer /> : null}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="sure"
            title="Вы уверены?"
            buttonText="Сохранить"
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            type={!!registerError ? "error" : "success"}
            isOpen={openInfoModal}
            onClose={handleCloseInfoModal}
          />
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
};

export default App;
