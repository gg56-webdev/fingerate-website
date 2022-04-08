const OSurl = 'https://opensea.io/assets/matic/0x778e62aa005f566e2379fd2cc431b23b4fec2ef5/';
const priceList = {
  S: 2000,
  A: 1000,
  B: 750,
  C: 500,
  D: 300,
};

export default function parseMetadata(data, token_id) {
  const {
    description,
    name: sotName,
    attributes: [{ value: country }, { value: city }, { value: grade }],
  } = data;
  const [fullId, name] = sotName.split(' - ');
  const id = fullId.substring(4);
  const [, lati, long] = description.match(/-?\d+\.?\d*/gi);

  return {
    name,
    country,
    city,
    grade,
    id,
    description,
    url: OSurl + token_id,
    lati: +lati,
    long: +long,
    source: 'Polygon',
    price: priceList[grade],
    token_id,
  };
}
