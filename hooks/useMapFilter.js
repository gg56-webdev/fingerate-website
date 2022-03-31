import { useState, useEffect } from 'react';

export default function useMapFilter(sots) {
  const [arrayToFilter, setArrayToFilter] = useState(sots);
  const [gradeFilter, setGradeFilter] = useState(null);
  const [countryFilter, setCountryFilter] = useState(null);
  const [forSaleFilter, setForSaleFilter] = useState(false);
  const [sourceFilter, setSourceFilter] = useState(null);

  const filterByGrade = (arr) => arr.filter((item) => (gradeFilter ? item.grade === gradeFilter : true));
  const filterByCountry = (arr) => arr.filter((item) => (countryFilter ? item.country === countryFilter : true));
  const filterByOwner = (arr) => arr.filter((item) => (forSaleFilter ? !item.owner : true));

  const sotSources = (sot) => {
    if (sourceFilter) {
      switch (sourceFilter) {
        case 'card':
          return sot.source !== 'Polygon';
        case 'crypto':
          return sot.source === 'Polygon';
        default:
          return false;
      }
    }
    return true;
  };
  const filterBySource = (arr) => arr.filter((item) => sotSources(item));

  useEffect(() => {
    let result = sots;
    result = filterByGrade(result);
    result = filterByCountry(result);
    result = filterByOwner(result);
    result = filterBySource(result);

    setArrayToFilter(result);
  }, [gradeFilter, countryFilter, forSaleFilter, sourceFilter]);

  return { arrayToFilter, setGradeFilter, setCountryFilter, setForSaleFilter, setSourceFilter };
}
