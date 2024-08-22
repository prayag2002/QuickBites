import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useCreateMyUser } from "../api/MyUserApi";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode; //ReactNode is a type that represents anything that can be rendered in React
};

//custom hook to create a new user with Auth0
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to inititalize auth");
  }

  //function to create a new user
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    navigate("/auth-callback"); //separating the redirect logic from the Auth0Provider component
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
