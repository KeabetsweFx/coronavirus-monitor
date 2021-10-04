import React, { useCallback } from 'react';

import { Radio } from 'components/radio';
import { FontSize } from 'public/fonts';
import { SemiBold } from 'theme/typography';

import { ListItem } from './styles';
import { OptionProps } from './types';

/**
 * Renders the option component
 *
 * @param props - Option component props
 */
export function Option(props: Props) {
  const { label, value, onSelect, selected } = props;

  const handleOnSelect = useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    <ListItem>
      <Radio onSelect={handleOnSelect} isSelected={selected}>
        <SemiBold fontSize={FontSize.H4}>{label}</SemiBold>
      </Radio>
    </ListItem>
  );
}

interface Props extends OptionProps {
  selected: boolean;
  onSelect(value: string): void;
}
