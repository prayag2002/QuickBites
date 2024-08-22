import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; //importing the base url from the .env file

//created a type for the create user request
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

//created a custom hook to create a new user
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0(); //this token is used to authenticate the user to the backend

  //created a function to make a post request to the backend
  const useCreateMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, //passing the token in the Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create new user");
    }
  };

  //using the useMutation hook to create a new user
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(useCreateMyUserRequest); //useMutation hook takes a function that makes the post request

  //returning the createUser function, isLoading, isError, and isSuccess to be used in the component
  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};
