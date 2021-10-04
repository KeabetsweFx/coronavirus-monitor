import Fuse from 'fuse.js';

import { Country } from '../types/summary';
import { StatsTotals, StatsFilter } from '../types/stats';

export const FILTER_MAP: Partial<Record<StatsFilter, StatsTotals>> = {
  Confirmed: 'TotalConfirmed',
  Deaths: 'TotalDeaths',
};

/**
 * Sorts countries by Covid 19 cases, Active, Deaths and Recoveries
 *
 * @param countries - A list of countries
 * @param filter - Filter key
 */
export function sortCountries(countries: Country[], filter: StatsFilter) {
  if (filter === 'Active') {
    return countries.sort(function (a, b) {
      const m = b.TotalConfirmed - b.TotalRecovered - b.TotalDeaths;
      const n = a.TotalConfirmed - a.TotalRecovered - a.TotalDeaths;

      return m - n;
    });
  } else {
    return countries.sort(function (a, b) {
      const key = FILTER_MAP[filter]!;
      return b[key] - a[key];
    });
  }
}

/**
 * Sorts countries by Covid 19 cases, Active, Deaths and Recoveries
 *
 * @param countries - A list of countries
 * @param filter - Filter key
 */
export function sortFilteredCountries(countries: Fuse.FuseResult<Country>[], filter: StatsFilter) {
  if (filter === 'Active') {
    return countries.sort(function (a, b) {
      const m = b.item.TotalConfirmed - b.item.TotalRecovered - b.item.TotalDeaths;
      const n = a.item.TotalConfirmed - a.item.TotalRecovered - a.item.TotalDeaths;

      return m - n;
    });
  } else {
    return countries.sort(function (a, b) {
      const key = FILTER_MAP[filter]!;
      return b.item[key] - a.item[key];
    });
  }
}
