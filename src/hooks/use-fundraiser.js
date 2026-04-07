import { useState, useEffect } from "react";
import useAuth from "../hooks/use-auth.js";
import getFundraiser from "../api/get-fundraiser";

export default function useFundraiser(fundraiserId) {
  const { auth } = useAuth();
  const [fundraiser, setFundraiser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    // Here we pass the fundraiserId to the getFundraiser function.
    getFundraiser(fundraiserId, auth.token)
      .then((fundraiser) => {
        setFundraiser(fundraiser);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    // This time we pass the fundraiserId to the dependency array so that the hook will re-run if the fundraiserId changes.
  }, [fundraiserId, auth.token]);

  const refetch = () => {
    setIsLoading(true);
    getFundraiser(fundraiserId, auth.token)
        .then((fundraiser) => {
            setFundraiser(fundraiser);
            setIsLoading(false);
        })
        .catch((error) => {
            setError(error);
            setIsLoading(false);
        });
};

  return { fundraiser, isLoading, error, refetch };
}