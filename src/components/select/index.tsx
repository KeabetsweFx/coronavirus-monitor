import React, { useCallback } from 'react';

import Feather from 'react-native-vector-icons/Feather';

import { ModalBox } from 'components/modal-box';
import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { Fill, Container } from 'theme/layout';
import { Regular, SemiBold } from 'theme/typography';

import { Picker } from './picker';
import { FormControl } from './styles';
import { OptionProps } from './types';

/**
 * Renders the select component
 *
 * @param props - select component
 */
export function Select(props: Props) {
  const { value, options, title, placeholder, name, onValueChange, onBlur, actions } = props;
  const { touched, error } = actions;

  const handleOnClose = () => {
    ModalBox.hide();
  };

  const handleOnChange = useCallback(
    (selected: string) => {
      ModalBox.hide();

      onValueChange(name, selected);
    },
    [name, onValueChange]
  );

  const handleOnPress = useCallback(() => {
    ModalBox.show('select', {
      content: (
        <Picker
          options={options}
          title={title}
          value={value}
          onClose={handleOnClose}
          onChange={handleOnChange}
        />
      ),
      onHide: onBlur,
    });
  }, [options, title, value, handleOnChange, onBlur]);

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
  title: string;
  placeholder?: string;
  options: OptionProps[];
  value?: string;
}
