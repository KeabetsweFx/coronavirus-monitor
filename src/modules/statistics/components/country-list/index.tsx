import React, { useCallback, useState, useMemo } from 'react';

import Fuse from 'fuse.js';
import { NativeSyntheticEvent, FlatList, ListRenderItemInfo } from 'react-native';
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from '@react-native-segmented-control/segmented-control';
import { useQuery } from 'react-query';

import { SearchBar } from 'components/search-bar';
import { CountryItem } from 'modules/statistics/components/shared/country-item';
import { StatsSummary, Country } from 'modules/statistics/types/summary';
import { StatsFilter } from 'modules/statistics/types/stats';
import { sortFilteredCountries } from 'modules/statistics/helpers/sort';
import { Colors } from 'public/colors';
import { Fill, Container } from 'theme/layout';

const FUSE_OPTIONS: Fuse.IFuseOptions<Country> = {
  keys: ['Country'],
  threshold: 0.1,
};
const DATASOURCE_MAP: StatsFilter[] = ['Confirmed', 'Active', 'Deaths'];

/**
 * Renders the country list component
 */
export function CountryListComponent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data } = useQuery<StatsSummary>('summary');
  const fuse = useMemo(() => new Fuse(data?.Countries ?? [], FUSE_OPTIONS), [data]);
  const unfiltered = useMemo(
    () =>
      data?.Countries.map((record, idx) => ({
        item: record,
        refIndex: idx,
      })),
    [data]
  );
  const [filtered, setFilteredCountries] = useState(unfiltered);
  const countries = sortFilteredCountries(filtered ?? [], DATASOURCE_MAP[selectedIndex]);

  const handleOnSelect = (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
  };

  const handleOnChange = useCallback(
    (query: string) => {
      const results = fuse.search(query);

      setFilteredCountries(results.length ? results : unfiltered);
    },
    [fuse, unfiltered]
  );

  const renderItem = useCallback(
    (info: ListRenderItemInfo<Fuse.FuseResult<Country>>) => {
      const {
        item: { item },
        index,
      } = info;

      return (
        <CountryItem
          key={item.Country}
          filter={DATASOURCE_MAP[selectedIndex]}
          order={index + 1}
          {...item}
        />
      );
    },
    [selectedIndex]
  );

  return (
    <Fill backgroundColor={Colors.white} pt="20px">
      <Container px="15px">
        <SearchBar placeholder="Search by country" onChange={handleOnChange} />
        <Container py="15px">
          <SegmentedControl
            values={['Total cases', 'Active cases', 'Deaths']}
            selectedIndex={selectedIndex}
            onChange={handleOnSelect}
            appearance="light"
          />
        </Container>
      </Container>
      <FlatList
        renderItem={renderItem}
        data={countries}
        keyExtractor={item => item.item.ID}
        initialNumToRender={20}
        removeClippedSubviews
      />
    </Fill>
  );
}
