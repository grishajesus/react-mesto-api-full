import React from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
  const { isOpen, onClose, onUpdateUser } = props;

  const { currentUser } = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({ name, about: description });
  };

  React.useEffect(() => {
    setName(currentUser?.name ?? "");
    setDescription(currentUser?.about ?? "");
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          required
          className="popup__input"
          name="name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="name-error"></span>
      </div>

      <div>
        <input
          required
          className="popup__input"
          name="description"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="about-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
