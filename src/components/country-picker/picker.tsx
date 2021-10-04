import React, { useMemo, useCallback, useState } from 'react';

import Fuse from 'fuse.js';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { SearchBar } from 'components/search-bar';
import { Colors } from 'public/colors';
import { Fill, Container } from 'theme/layout';

import { Header } from './header';
import { CountryItem } from './country-item';
import { Country } from './types';

const FUSE_OPTIONS: Fuse.IFuseOptions<Country> = {
  keys: ['Country'],
  threshold: 0.1,
};

/**
 * Renders the country picker component
 *
 * @param props - country picker props
 */
export function Picker(props: Props) {
  const { countries, value, onChange, onClose } = props;
  const fuse = useMemo(() => new Fuse(countries ?? [], FUSE_OPTIONS), [countries]);
  const unfiltered = useMemo(
    () =>
      countries.map((record, idx) => ({
        item: record,
        refIndex: idx,
      })),
    [countries]
  );
  const [filtered, setFilteredCountries] = useState(unfiltered);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<Fuse.FuseResult<Country>>) => {
      const {
        item: { item },
      } = info;
      const selected = value === item.Country;

      return <CountryItem selected={selected} onChange={onChange} {...item} />;
    },
    [onChange, value]
  );

  const handleOnChange = useCallback(
    (query: string) => {
      const results = fuse.search(query);

      setFilteredCountries(results.length ? results : unfiltered);
    },
    [fuse, unfiltered]
  );

  return (
    <Fill backgroundColor={Colors.white}>
      <Header title="Select country" onClose={onClose} />
      <Container px="15px" py={15}>
        <SearchBar placeholder="Search by country" onChange={handleOnChange} />
      </Container>
      <FlatList
        renderItem={renderItem}
        keyExtractor={item => item.item.ISO2}
        data={filtered}
        initialNumToRender={20}
        removeClippedSubviews
      />
    </Fill>
  );
}
/** Type definitions */
interface Props {
  value?: string;
  countries: Country[];
  onClose(): void;
  onChange(country: string): void;
}
