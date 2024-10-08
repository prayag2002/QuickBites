import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; //importing the base url from the .env file

//created a custom hook to get the current user details
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest); //useQuery hook takes a key and a function that makes the get request

  if (error) {
    toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};

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

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

//created a custom hook to update the user details
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  //flow - get the token, make a put request to the backend, update the user details
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated successfully");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,
  };
};
