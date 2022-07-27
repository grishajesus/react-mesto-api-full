import successIconPath from "../images/success.svg";
import failIconPath from "../images/fail.svg";

const InfoTooltip = (props) => {
  const { type, isOpen, onClose } = props;

  const rootClassName = `popup popup-image popup_type_info ${
    isOpen ? "popup_opened" : ""
  }`;

  const getContent = () => {
    if (type === "error") {
      return {
        icon: failIconPath,
        title: "Что-то пошло не так! Попробуйте ещё раз.",
      };
    }

    return {
      icon: successIconPath,
      title: "Вы успешно зарегистрировались!",
    };
  };

  const { icon, title } = getContent();

  return (
    <div className={rootClassName}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />

        <div className="popup__info__icon">
          <img src={icon} alt={type} />
        </div>

        <div className="popup__info__details">{title}</div>
      </div>
    </div>
  );
};

export default InfoTooltip;
