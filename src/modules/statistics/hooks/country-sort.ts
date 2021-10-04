import { useState } from 'react';

import { sortCountries } from 'modules/statistics/helpers/sort';
import { StatsFilter } from 'modules/statistics/types/stats';

import { Country } from '../types/summary';

const SortBy: StatsFilter[] = ['Confirmed', 'Active', 'Deaths'];

/**
 * Provides a list of sorted countries based on the current index
 * of the country filter
 *
 * @param selectedIndex - selected index
 * @param countries - A list of countries
 */
export function useCountryStatsFilter(selectedIndex: number, countries?: Country[]) {
  const [deaths] = useState(sortCountries(countries ?? [], 'Deaths'));
  const [confirmed] = useState(sortCountries(countries ?? [], 'Confirmed'));
  const [active] = useState(sortCountries(countries ?? [], 'Active'));
  const cases = [confirmed, active, deaths];

  return {
    sorted: cases[selectedIndex],
    orderKey: SortBy[selectedIndex],
  };
}
