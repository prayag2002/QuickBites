import { useAuth0 } from "@auth0/auth0-react";
import { useCreateMyUser } from "../api/MyUserApi";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//created a component to handle the auth callback
const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false); //useRef is different from useState because it does not cause a re-render when the value changes

  //created a useEffect hook to create a new user when the user logs in
  useEffect(() => {
    if (user?.sub && user.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]); //the useEffect hook will run when the createUser, navigate, or user values change

  return <>Loading...</>;
};

export default AuthCallbackPage;
