import React, { useCallback } from 'react';

import Feather from 'react-native-vector-icons/Feather';

import { Colors } from 'public/colors';
import { Fill } from 'theme/layout';
import { SemiBold } from 'theme/typography';

import { ListItem } from './styles';
import { Country as CountryType } from './types';

/**
 * Renders the country item component
 *
 * @param props - country item props
 */
export function CountryItem(props: Props) {
  const { onChange, Country: country, selected } = props;

  const handleOnChange = useCallback(() => {
    onChange(country);
  }, [country, onChange]);

  return (
    <ListItem onPress={handleOnChange}>
      <Fill>
        <SemiBold>{country}</SemiBold>
      </Fill>
      {selected && <Feather name="check" size={20} color={Colors.green} />}
    </ListItem>
  );
}
/** Type definitions */
interface Props extends CountryType {
  selected: boolean;
  onChange(country: string): void;
}
