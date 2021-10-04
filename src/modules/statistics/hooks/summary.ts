import axios from 'axios';
import { useQuery } from 'react-query';

import { StatsSummary } from '../types/summary';

/**
 * Provides a summary of covid 19 world stats
 */
export function useStatsSummary() {
  return useQuery('summary', async () => {
    try {
      const { data } = await axios.get<StatsSummary>('https://api.covid19api.com/summary');

      return data;
    } catch (e) {
      throw new Error('Network response was not ok');
    }
  });
}
