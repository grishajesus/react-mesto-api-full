import React from "react";
import { Link, useLocation } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";
import logoPath from "../images/logonorm.svg";

const Header = (props) => {
  const { onLogout } = props;

  const { pathname } = useLocation();

  const { authUser } = React.useContext(CurrentUserContext);

  const handleClickLogout = (event) => {
    event.preventDefault();

    onLogout();
  };

  const getUserInfo = () => {
    if (authUser) {
      return (
        <>
          <p className="header__user-info__email">{authUser.email}</p>
          <p>
            <button onClick={handleClickLogout}>Выйти</button>
          </p>
        </>
      );
    }

    if (pathname === "/sign-in") {
      return (
        <p>
          <Link to="/sign-up">Регистрация</Link>
        </p>
      );
    }

    if (pathname === "/sign-up") {
      return (
        <p>
          <Link to="/sign-in">Войти</Link>
        </p>
      );
    }

    return null;
  };

  const userInfoClassName = `header__user-info ${
    authUser ? "header__user-info_authorized" : ""
  }`;

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logoPath} alt="mesto logo" className="header__logo" />
      </div>

      <div className={userInfoClassName}>{getUserInfo()}</div>
    </header>
  );
};

export default Header;
