import React, { PropsWithChildren } from 'react';

import { TouchableOpacity } from 'react-native';

import { Colors } from 'public/colors';
import { ACTIVE_OPACITY } from 'public/misc';
import { Circle, Row, Fill } from 'theme/layout';

/**
 * Renders the radio component
 *
 * @param props - Radio props
 */
export function Radio(props: PropsWithChildren<Props>) {
  const { isSelected, onSelect, children } = props;
  const borderColor = isSelected ? Colors.green : Colors.silver;
  const backgroundColor = isSelected ? Colors.green : Colors.white;

  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={ACTIVE_OPACITY}>
      <Row alignItems="center" mb="15px">
        <Circle cr={25} borderColor={borderColor} borderWidth={1} mr={15}>
          <Circle cr={17} backgroundColor={backgroundColor} />
        </Circle>
        <Fill>{children}</Fill>
      </Row>
    </TouchableOpacity>
  );
}
/** Type definitions */
interface Props {
  onSelect?(): void;
  isSelected?: boolean;
}
