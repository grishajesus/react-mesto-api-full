import React from "react";
import { Link, Navigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const Register = (props) => {
  const { onRegister } = props;

  const { authUser } = React.useContext(CurrentUserContext);

  const [values, setValues] = React.useState(INITIAL_VALUES);
  const [submitting, setSubmitting] = React.useState(false);

  if (authUser) {
    return <Navigate replace to="/" />;
  }

  const handleChange = (event) =>
    setValues((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);

      await onRegister(values);
      setValues(INITIAL_VALUES);
    } catch (error) {
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__header">
          <h3>Регистрация</h3>
        </div>

        <div className="auth-form__body">
          <div className="auth-form__row">
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              className="auth-form__input"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-form__row">
            <input
              required
              type="password"
              name="password"
              placeholder="Пароль"
              className="auth-form__input"
              value={values.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="auth-form__footer">
          <button type="submit" disabled={submitting}>
            Зарегистрироваться
          </button>

          <p>
            <Link to="/sign-in">Уже зарегистрированы? Войти</Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Register;
