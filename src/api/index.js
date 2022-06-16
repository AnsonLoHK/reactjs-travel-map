import axios from "axios";

// 此種方式寫法比較漂亮
export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: response } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          "X-RapidAPI-Key":
            "a8cfee3addmsh457470a3c5712a8p124c0ejsn6b81bb091743",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return response;
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

// 0616 測試 天氣 (換個方式寫)
async function Test(lat, lng) {
  try {
    if (lat && lng) {
      let res = await axios({
        method: "GET",
        url: "https://community-open-weather-map.p.rapidapi.com/find",
        // params: { lat, lon: lng },
        params: {
          // q: "London,uk", //應該可有可無
          lat,
          lon: lng,
        },
        headers: {
          "X-RapidAPI-Key":
            "a8cfee3addmsh457470a3c5712a8p124c0ejsn6b81bb091743",
          "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com",
        },
      });
      let data = res.data;
      return data;
    }
  } catch (error) {
    console.log(error.response); // this is the main part. Use the response property from the error object

    return error.response;
  }
}

export default Test;
