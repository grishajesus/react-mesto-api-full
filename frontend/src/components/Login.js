import React from "react";
import { Navigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const Login = (props) => {
  const { onLogin } = props;

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

      await onLogin(values);
      setValues(INITIAL_VALUES);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-form__header">
          <h3>Вход</h3>
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
            Войти
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
