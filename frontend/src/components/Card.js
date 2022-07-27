import React from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = (props) => {
  const { card, onClick, onCardLike, onCardDelete } = props;

  const { currentUser } = React.useContext(CurrentUserContext);

  const handleClick = () => onClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card)

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((like) => like === currentUser._id);

  const cardDeleteButtonClassName = `place-card__delete ${
    isOwn ? "" : "place-card__delete_hidden"
  }`;

  const cardLikeButtonClassName = `place-card__like-icon ${
    isLiked ? "place-card__like-icon_active" : ""
  }`;

  return (
    <div className="place-card">
      <div className={cardDeleteButtonClassName} onClick={handleDeleteClick} />

      <img
        className="place-card__image"
        data-modal-id="place-image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />

      <div className="place-card__description">
        <h3 className="place-card__name">{card.name}</h3>

        <div className="place-card__likebox">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />

          <div className="place-card__likes">{card.likes.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
