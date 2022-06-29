import { useState, useReducer, useEffect } from 'react';

const filterInitialState = {
  gradeFilter: '',
  countryFilter: '',
  forSaleFilter: false,
  sourceFilter: '',
};

export const FILTER_ACTIONS = Object.freeze({
  SET: 'set',
  // RESET: 'reset',
});

const reducer = (state, { type, payload }) => {
  switch (type) {
    case FILTER_ACTIONS.SET:
      const [key, val] = payload;
      return { ...state, [key]: val };
    // case FILTER_ACTIONS.RESET:
    //   return { ...filterInitalState };
    default:
      return state;
  }
};

export default function useFilter(sots) {
  const [filteredSots, setFilteredSots] = useState([]);
  const [state, dispatch] = useReducer(reducer, { ...filterInitialState });
  const { gradeFilter, countryFilter, forSaleFilter, sourceFilter } = state;

  useEffect(() => {
    const filterByCountry = (arr) => arr.filter(({ country }) => country === countryFilter);
    const filterByGrade = (arr) => arr.filter(({ grade }) => grade === gradeFilter);
    const filterBySource = (arr) =>
      arr.filter(({ source }) => (sourceFilter === 'crypto' ? source !== 'Firebase' : source === 'Firebase'));
    const filterByForSale = (arr) => arr.filter(({ owner }) => !owner);

    let res = sots;
    if (countryFilter) res = filterByCountry(res);
    if (gradeFilter) res = filterByGrade(res);
    if (sourceFilter) res = filterBySource(res);
    if (forSaleFilter) res = filterByForSale(res);

    setFilteredSots(res);
  }, [state, sots]);

  return { dispatch, filteredSots };
}
