import Head from 'next/head';
import { MapProvider } from 'react-map-gl';
import useFilter from '../hooks/useFilter';
import { Mapbox, MapMenu } from '../components/map';

import ko from '../locales/ko/map.json';
import en from '../locales/en/map.json';

export async function getStaticProps() {
  const [{ default: getFirebaseSots }, { default: getPolygonSots }, { default: getCountryCoords }] = await Promise.all([
    import('../utils/getFirebaseSots'),
    import('../utils/getPolygonSots'),
    import('../utils/getCountryCoords'),
  ]);
  const [firebaseSots, polygonSots] = await Promise.all([getFirebaseSots(), getPolygonSots()]);
  const allSots = [...firebaseSots, ...polygonSots];

  let availableCountries = [...new Set(allSots.map(({ country }) => country))];

  availableCountries = await Promise.all(
    availableCountries.map(async (country) => {
      const [_lat, _long] = await getCountryCoords(country);
      return { country, _lat, _long };
    })
  );

  return {
    props: { allSots, availableCountries },
  };
}

export default function MapOfSots({ allSots, availableCountries, locale }) {
  const filter = useFilter(allSots);
  const t = locale === 'ko' ? ko : en;
  return (
    <MapProvider>
      <Head>
        <title>Map of SoTs</title>
        <meta name='description' content='Map of all SoTs currently deployed around the world' />
      </Head>
      <Mapbox filteredSots={filter.filteredSots} t={t} />
      <MapMenu {...filter} availableCountries={availableCountries} t={t} />
    </MapProvider>
  );
}
