import React from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

const Main = (props) => {
  const {
    cards,
    onCardLike,
    onCardDelete,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
  } = props;

  const { currentUser } = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__pic">
          <div className="profile__pic-edit" onClick={onEditAvatar}>
            <i className="icon icon-pencil"></i>
          </div>

          <img src={currentUser.avatar} alt="default avatar" />
        </div>

        <div className="profile__data">
          <div className="profile__box">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>

      <div id="places-list" className="places-list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
