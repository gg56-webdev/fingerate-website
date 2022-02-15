const OSurl =
  'https://opensea.io/assets/matic/0x778e62aa005f566e2379fd2cc431b23b4fec2ef5/';

export default function parseMetadata(data, token_id) {
  const { description, name, image, attributes } = data;
  const [id, location] = name.split(' - ');
  const coords = description.match(/-?\d+\.?\d*/gi);
  return {
    location,
    description,
    id,
    image,
    country: attributes[0].value,
    city: attributes[1].value,
    grade: attributes[2].value,
    url: OSurl + token_id,
    lati: +coords[1],
    long: +coords[2],
  };
}
