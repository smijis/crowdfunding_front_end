// "-" in the name tells other coders that this is not a component

async function getFundraisers() {
    //create our URL
    const url = `${import.meta.env.VITE_API_URL}/fundraisers`;

    // next use the fetch function to call the URL
    const response = await fetch(url, { method: "GET" });

     //we are trying to get fundraisers from server, if the response isn't ok, we will create an error message.
    if (!response.ok) {
        const fallbackError = "Error fetching fundraisers";

        //we will try to find out what the response is, if we can't we will raise an error.
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError; //data?. means see if it has any details to use, ?? means if it doesnt, use fallbackError message instead
        throw new Error(errorMessage)
    };

    return await response.json(); //if the response is ok, it will return json
};

export default getFundraisers;