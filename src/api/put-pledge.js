async function putPledge(pledgeId, comment, anonymous) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "PUT", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      body: JSON.stringify({
        "comment": comment,
        "anonymous": anonymous,
      }),
      });
    
      if (!response.ok) {
        const fallbackError = `Error trying to edit pledge`;
    
        const data = await response.json().catch(() => {
          throw new Error(fallbackError);
        });
        console.log(data);
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
      }
    
      return await response.json();
    }
    
    export default putPledge;