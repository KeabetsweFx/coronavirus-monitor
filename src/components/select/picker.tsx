import React, { useCallback } from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { Fill, Container } from 'theme/layout';
import { Bold } from 'theme/typography';

import { OptionProps } from './types';
import { Option } from './option';
import { Close, Panel } from './styles';

/**
 * Renders the select picker component
 *
 * @param props - select picker props
 */
export function Picker(props: Props) {
  const { onClose, options, value, title, onChange } = props;

  const renderItem = useCallback(
    (option: OptionProps) => {
      const { value: itemValue, label } = option;

      return (
        <Option
          key={itemValue}
          selected={value === itemValue}
          label={label}
          value={itemValue}
          onSelect={onChange}
        />
      );
    },
    [value, onChange]
  );

  return (
    <Fill justifyContent="flex-end">
      <Panel>
        <Container mb="30px">
          <Bold fontSize={FontSize.H3} textAlign="center">
            {title}
          </Bold>
        </Container>
        {options.map(renderItem)}
        <Close onPress={onClose}>
          <MaterialIcons name="close" color={Colors.black} size={22} />
        </Close>
      </Panel>
    </Fill>
  );
}
/** Type definitions */
interface Props {
  title: string;
  options: OptionProps[];
  value?: string;
  onClose(): void;
  onChange(value: string): void;
}
