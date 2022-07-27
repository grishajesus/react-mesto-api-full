const ImagePopup = (props) => {
  const { card, onClose } = props;

  const isOpen = !!card;

  const rootClassName = `popup popup-image popup_type_image ${
    isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={rootClassName}>
      <div className="popup-image__content">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />

        {card ? (
          <>
            <img
              className="popup-image__image"
              src={card.link}
              alt={card.name}
            />

            <h4 className="popup-image__title">{card.name}</h4>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ImagePopup;
