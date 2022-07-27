import React from "react";
import { Navigate } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

const ProtectedRoute = (props) => {
  const { children } = props;

  const { authUser } = React.useContext(CurrentUserContext);

  if (!authUser) {
    return <Navigate replace to="/sign-in" />;
  }

  return children;
};

export default ProtectedRoute;
