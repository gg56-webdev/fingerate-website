import axios from 'axios';
import backupData from '../data/newData.json';
import parseMetadata from './parseMetadata';

export default async function getSoTData() {
  let sots = [];
  try {
    const {
      data: { result },
    } = await axios.get(
      'https://deep-index.moralis.io/api/v2/nft/0x778E62AA005F566E2379FD2cC431B23B4Fec2ef5?chain=polygon&format=decimal',
      {
        headers: {
          'X-API-key': process.env.MORALIS_API_KEY,
        },
      }
    );

    for (const item of result) {
      if (!item.metadata) {
        const { data } = await axios.get(item.token_uri);
        sots.push(parseMetadata(data, item.token_id));
      } else {
        sots.push(parseMetadata(JSON.parse(item.metadata), item.token_id));
      }
    }
    return sots;
  } catch (err) {
    console.error(err);
    return (sots = backupData);
  }
}
