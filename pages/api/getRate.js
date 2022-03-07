import fs from 'fs';
import path from 'path';
import axios from 'axios';

const XR_CACHE_PATH = path.join(__dirname, 'xrData.json');

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(' ')[1];

  if (authToken === process.env.CRON_API_KEY) {
    try {
      const {
        data: { data: XRData },
      } = await axios.get('https://freecurrencyapi.net/api/v2/latest', {
        params: { apikey: process.env.EXCHANGE_API_KEY },
      });

      fs.writeFileSync(XR_CACHE_PATH, JSON.stringify(XRData));
      console.log('Wrote to XR cache');

      res.status(201).json({ msg: 'XRData updated', XRData });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).send('Unauthorized');
  }
}
