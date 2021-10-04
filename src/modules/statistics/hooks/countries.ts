import axios from 'axios';
import { useQuery } from 'react-query';

import { Country } from 'components/country-picker/types';

/**
 * Provides a list of reported countries
 */
export function useCountries() {
  return useQuery('countries', async () => {
    try {
      const { data } = await axios.get<Country[]>('https://api.covid19api.com/countries');

      return data;
    } catch (e) {
      throw new Error('Network response was not ok');
    }
  });
}
