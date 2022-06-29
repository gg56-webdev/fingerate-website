import { Flex, Select, FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useMap } from 'react-map-gl';
import { FILTER_ACTIONS } from '../../../hooks/useFilter';

export default function Filters({ availableCountries, dispatch, t }) {
  const { map } = useMap();
  const changeCountry = (e) => {
    dispatch({ type: FILTER_ACTIONS.SET, payload: ['countryFilter', e.target.value] });
    if (e.target.value) {
      const { _lat, _long } = availableCountries.find(({ country }) => country === e.target.value);
      map.flyTo({ center: [_long, _lat], zoom: 4, essential: true });
    }
  };
  return (
    <Flex gap='1' p='1' bg='purple.50' shadow='inner' borderRadius='md' flexWrap='wrap'>
      <Select flex='1 1 auto' bg='white' w='auto' onChange={changeCountry}>
        <option value=''>- {t.filters.country} -</option>
        {availableCountries.map(({ country }) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </Select>
      <Select
        bg='white'
        w='auto'
        onChange={(e) => {
          dispatch({ type: FILTER_ACTIONS.SET, payload: ['gradeFilter', e.target.value] });
        }}
      >
        <option value=''>- {t.filters.grade} -</option>
        {['S', 'A', 'B', 'C', 'D'].map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </Select>

      <Select
        flex='0.75 1 auto'
        bg='white'
        w='auto'
        onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET, payload: ['sourceFilter', e.target.value] })}
      >
        <option value=''>- {t.filters.source} -</option>
        <option value='card'>{t.filters.buyWithCard}</option>
        <option value='crypto'>{t.filters.buyWithCrypto}</option>
      </Select>

      <FormControl
        bg='white'
        display='flex'
        h='10'
        alignItems='center'
        borderWidth='1px'
        borderRadius='md'
        pl='4'
        pr='2'
        w='auto'
        flexShrink='0'
      >
        <FormLabel htmlFor='owner-toogle' m='0' mr='2'>
          {t.filters.ownership}
        </FormLabel>
        <Switch
          id='owner-toogle'
          colorScheme='purple'
          onChange={(e) => dispatch({ type: FILTER_ACTIONS.SET, payload: ['forSaleFilter', e.target.checked] })}
        />
      </FormControl>
    </Flex>
  );
}
