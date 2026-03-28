async function postFundraiser(title, image, description, suburb, postcode, goal, deadline, is_open) {
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
      method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      body: JSON.stringify({
        "title": title,
        "image": image,
        "description": description,
        "suburb": suburb,
        "postcode": postcode,
        "goal": goal,
        "deadline": deadline,
        "is_open": is_open,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to create a fundraiser`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      console.log(data);
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postFundraiser;