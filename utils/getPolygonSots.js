import axios from 'axios';

const MORALIS_API_ENDPOINT =
  'https://deep-index.moralis.io/api/v2/nft/0x778E62AA005F566E2379FD2cC431B23B4Fec2ef5?chain=polygon&format=decimal';

export default async function getPolygonSots() {
  let sots = [];
  try {
    const {
      data: { result },
    } = await axios.get(MORALIS_API_ENDPOINT, { headers: { 'X-API-key': process.env.MORALIS_API_KEY } });

    for (const t of result) {
      if (!t.metadata) {
        const { data } = await axios.get(t.token_uri);
        sots.push(parsePolygonMetadata(data, t.token_id));
      } else {
        const data = JSON.parse(t.metadata);
        sots.push(parsePolygonMetadata(data, t.token_id));
      }
    }
  } catch (err) {
    console.error(err);
  }
  return sots;
}

const OPENSEA_COLLECTION_URL = 'https://opensea.io/assets/matic/0x778e62aa005f566e2379fd2cc431b23b4fec2ef5/';
const PRICE_LIST = Object.freeze({
  S: 2000,
  A: 1000,
  B: 750,
  C: 500,
  D: 300,
});

const parsePolygonMetadata = (metadata, token_id) => {
  const {
    description,
    name: fullName,
    attributes: [{ value: country }, { value: city }, { value: grade }],
  } = metadata;
  const [fullId, name] = fullName.split(' - ');
  const id = fullId.substring(4);
  const [, latitude, longitude] = description.match(/-?\d+\.?\d*/gi);

  return {
    name,
    country,
    city,
    grade,
    id,
    // description,
    _lat: +latitude,
    _long: +longitude,
    price: PRICE_LIST[grade.toUpperCase()],
    source: 'Polygon',
    token_id,
    url: OPENSEA_COLLECTION_URL + token_id,
  };
};
