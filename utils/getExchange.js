import axios from 'axios';

export default async function getExchange() {
  const {
    data: {
      data: { KRW },
    },
  } = await axios.get('https://freecurrencyapi.net/api/v2/latest', {
    params: { apikey: process.env.EXCHANGE_API_KEY },
  });

  return KRW || null;
}
