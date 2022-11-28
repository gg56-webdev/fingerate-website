import axios from 'axios';

const MORALIS_API_ENDPOINT = 'https://deep-index.moralis.io/api/v2/nft/';
const CONTRACT_ADDRESS = '0x778E62AA005F566E2379FD2cC431B23B4Fec2ef5';

export default async function getPolygonSots() {
  let sots = [];
  try {
    await getDataFromMoralis();
    for (const t of results) {
      if (!t.metadata) {
        const { data } = await axios.get(t.token_uri);
        sots.push(parsePolygonMetadata(data, t.token_id));
      } else {
        const data = JSON.parse(t.metadata);
        sots.push(parsePolygonMetadata(data, t.token_id));
      }
    }
    return sots;
  } catch (err) {
    console.log(err);
  }
}

const results = [];

const getDataFromMoralis = async (nextPage) => {
  const {
    data: { result, cursor },
  } = await axios.request({
    baseURL: MORALIS_API_ENDPOINT,
    url: CONTRACT_ADDRESS,
    params: { chain: 'polygon', format: 'decimal', cursor: nextPage },
    headers: { 'X-API-key': process.env.MORALIS_API_KEY },
  });
  results.push(...result);
  if (cursor) await getDataFromMoralis(cursor);
};

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
