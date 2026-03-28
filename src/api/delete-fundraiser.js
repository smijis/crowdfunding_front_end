async function deleteFundraiser(fundraiserId) {
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
        method: "DELETE", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
        },
        });
      
        if (!response.ok) {
          const fallbackError = `Error trying to delete fundraiser`;
          const data = await response.json().catch(() => {
            throw new Error(fallbackError);
          });
          console.log(data);
          const errorMessage = data?.detail ?? fallbackError;
          throw new Error(errorMessage);
        }
      
        if (response.status === 204) {
            return;
      }
    }
      
  export default deleteFundraiser;