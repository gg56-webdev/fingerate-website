import axios from 'axios';

const RESTCOUNTRIES_API_ENDPOINT = 'https://restcountries.com/v3.1/name/';

export default async function getCountryCoords(country) {
  try {
    const {
      data: [{ latlng }],
    } = await axios.get(RESTCOUNTRIES_API_ENDPOINT + country);
    return latlng;
  } catch (err) {
    console.log(err);
  }
}
