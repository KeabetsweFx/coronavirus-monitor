import React, { useCallback } from 'react';

import Feather from 'react-native-vector-icons/Feather';

import { Sheet } from 'components/sheet';
import { FormControl } from 'components/select/styles';
import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { Fill, Container } from 'theme/layout';
import { Regular, SemiBold } from 'theme/typography';

import { Picker } from './picker';
import { Country } from './types';

/**
 * Renders the country picker component
 *
 * @param props - country picker component
 */
export function CountryPicker(props: Props) {
  const { value, countries, placeholder, name, onValueChange, onBlur, actions } = props;
  const { touched, error } = actions;

  const handleOnClose = () => {
    Sheet.hide();
  };

  const handleOnChange = useCallback(
    (selected: string) => {
      Sheet.hide();

      onValueChange(name, selected);
    },
    [name, onValueChange]
  );

  const handleOnPress = useCallback(() => {
    Sheet.show('country-picker', {
      content: (
        <Picker
          countries={countries}
          value={value}
          onClose={handleOnClose}
          onChange={handleOnChange}
        />
      ),
      onHide: onBlur,
    });
  }, [countries, value, handleOnChange, onBlur]);

  const color = placeholder && !value ? Colors.dusty : Colors.black;
  const hasError = error && touched;
  const borderColor = hasError ? Colors.monza : Colors.mischka;

  return (
    <>
      <FormControl onPress={handleOnPress} borderColor={borderColor}>
        <Fill>
          <Regular color={color} fontSize={FontSize.H4}>
            {value || placeholder}
          </Regular>
        </Fill>
        <Feather name="chevron-down" size={20} color={Colors.black} />
      </FormControl>
      {hasError && (
        <Container mt="5px">
          <SemiBold color={Colors.monza}>{error}</SemiBold>
        </Container>
      )}
    </>
  );
}
/** Type denifitions */
interface Actions {
  error?: any;
  touched?: any;
}

interface Props {
  actions: Actions;
  name: string;
  onValueChange(name: string, value: string): void;
  onBlur?(): void;
  placeholder?: string;
  countries: Country[];
  value?: string;
}
