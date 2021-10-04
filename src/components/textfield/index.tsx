import React, { useCallback, forwardRef } from 'react';

import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInput,
  TextInputProps,
} from 'react-native';

import { Colors } from 'public/colors';
import { Container } from 'theme/layout';
import { SemiBold } from 'theme/typography';

import { InputContainer, InputControl } from './styles';

/**
 * Renders the Text field component
 *
 * @param props - Textfield props
 * @returns Custom Textfield component
 */
export const TextField = forwardRef<TextInput, Props>((props, ref) => {
  const { onFieldChange, onFocus, keyboardType, onValueChange, name, actions, showError, ...rest } =
    props;
  const { error, touched } = actions;

  const handleChange = useCallback(
    (value: string) => {
      onValueChange(name, value);
    },
    [onValueChange, name]
  );

  const handleOnFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (onFocus) {
        onFocus(e);
      }
      if (onFieldChange) {
        onFieldChange(name);
      }
    },
    [onFocus, onFieldChange, name]
  );

  const hasError = error && touched;
  const borderColor = hasError ? Colors.monza : Colors.mischka;

  return (
    <>
      <InputContainer style={{ borderColor }}>
        <InputControl
          ref={ref}
          keyboardType={keyboardType}
          onChangeText={handleChange}
          underlineColorAndroid={Colors.transparent}
          onFocus={handleOnFocus}
          {...rest}
        />
      </InputContainer>
      {hasError && showError && (
        <Container mt="5px">
          <SemiBold color={Colors.monza}>{error}</SemiBold>
        </Container>
      )}
    </>
  );
});

TextField.defaultProps = {
  showError: true,
};

/** Type definitions */
export interface Actions {
  error?: any;
  touched?: any;
}

export interface Props extends TextInputProps {
  actions: Actions;
  name: string;
  onFieldChange?(name: string): void;
  onValueChange(name: string, value: string): void;
  showError?: boolean;
}
