import React from "react";

import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const { isOpen, onClose, onAddPlace } = props;

  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "link") {
      setLink(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPlace({ name: title, link });
  };

  React.useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <input
          required
          type="text"
          className="popup__input"
          name="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={title}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="title-error"></span>
      </div>

      <div>
        <input
          required
          type="url"
          className="popup__input"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="link-error"></span>
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
