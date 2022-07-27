const PopupWithForm = (props) => {
  const { isOpen, name, title, buttonText, children, onClose, onSubmit } =
    props;

  const rootClassName = `popup popup_type_${name} ${
    isOpen ? "popup_opened" : ""
  }`;

  return (
    <div className={rootClassName}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>

        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}

          <button type="submit" className="popup__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
