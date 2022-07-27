import React from "react";

import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
  const { isOpen, onClose, onUpdateAvatar } = props;

  const inputRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputRef.current) {
      onUpdateAvatar({ avatar: inputRef.current.value });
    }
  };

  React.useEffect(() => {
    if (!isOpen && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          required
          type="url"
          className="popup__input"
          name="avatar"
          placeholder="Ссылка на картинку"
          ref={inputRef}
        />

        <span className="popup__input-error" id="avatar-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
