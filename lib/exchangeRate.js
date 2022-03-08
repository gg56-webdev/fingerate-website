import fs from 'fs';
import path from 'path';
import axios from 'axios';

const XR_CACHE_PATH = path.join(__dirname, 'xrData.json');

export default async function getXR() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(XR_CACHE_PATH, 'utf8'));
  } catch (error) {
    console.log('XR cache not initialized');
  }

  if (!cachedData) {
    const {
      data: { data: XRData },
    } = await axios.get('https://api.currencyapi.com/v3/latest', {
      params: { apikey: process.env.EXCHANGE_API_KEY },
    });

    try {
      fs.writeFileSync(XR_CACHE_PATH, JSON.stringify(XRData));
      console.log('Wrote inital XR cache');
    } catch (error) {
      console.log('ERROR WRITING XR CACHE TO FILE');
      console.log(error);
    }

    cachedData = XRData;
  }

  return cachedData;
}
