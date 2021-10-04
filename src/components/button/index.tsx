import React, { PropsWithChildren } from 'react';

import { TouchableOpacityProps, ViewProps, ViewStyle, ActivityIndicator } from 'react-native';

import { Colors } from 'public/colors';
import { Fill } from 'theme/layout';
import { ButtonContainer, ButtonWrapper } from './styles';

const LOADER_SIZE = 20;
const ACTIVE_OPACITY = 0.8;

/**
 * Renders th button component
 *
 * @export
 * @param {PropsWithChildren<Props>} props - Button props
 * @returns Button
 */
export function Button(props: PropsWithChildren<Props>) {
  const {
    rounded,
    disabled,
    backgroundColor,
    borderRadius,
    onPress,
    style,
    loading,
    children,
    ...rest
  } = props;
  const radius = rounded ? getRoundedStyle() : { borderRadius };
  const bg = disabled ? Colors.silver : backgroundColor;
  const customStyles: ViewStyle = {
    backgroundColor: bg,
    ...radius,
  };

  return (
    <ButtonWrapper
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={ACTIVE_OPACITY}
      {...radius}
      {...rest}>
      <ButtonContainer style={[customStyles, style]}>
        <Fill justifyContent="center" alignItems="center">
          {loading ? <ActivityIndicator size={LOADER_SIZE} color={Colors.white} /> : children}
        </Fill>
      </ButtonContainer>
    </ButtonWrapper>
  );
}

/**
 * Rounded button style
 *
 * @returns style
 */
function getRoundedStyle() {
  return {
    borderRadius: 25,
  };
}

Button.defaultProps = {
  borderRadius: 0,
  backgroundColor: Colors.carnation,
};

/** Type definitions */
type ButtonType = TouchableOpacityProps & ViewProps & ViewStyle;

interface Props extends ButtonType {
  loading?: boolean;
  rounded?: boolean;
  style?: ViewStyle;
}
