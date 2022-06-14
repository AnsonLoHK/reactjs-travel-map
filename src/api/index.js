import axios from "axios";

// const URL =
//   "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

// Want to use async/await? Add the `async` keyword to your outer function/method.
export const getPlacesData = async (sw, ne) => {
  try {
    const { data: response } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        "X-RapidAPI-Key": "a8cfee3addmsh457470a3c5712a8p124c0ejsn6b81bb091743",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      // The client was given an error response (5xx, 4xx)
      // console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);
    } else if (err.request) {
      // The client never received a response, and the request was never left
      // console.log(err.request);
    } else {
      // Anything else
      // console.log("Error", err.message);
    }
  }
};
