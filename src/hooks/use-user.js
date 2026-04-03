import { useState, useEffect } from "react";

import getUserProfile from "../api/get-user";

export default function useUserProfile(userId) {
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getUserProfile(userId)
      .then((userProfile) => {
        setUserProfile(userProfile);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

  }, [userId]);

  return { userProfile, isLoading, error};
}