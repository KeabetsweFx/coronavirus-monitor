import { ViewStyle, TextProps, Text } from 'react-native';
import styled from 'styled-components';
import {
  space,
  SpaceProps,
  TypographyProps,
  typography,
  ColorProps,
  color,
  layout,
} from 'styled-system';

import { Colors } from 'public/colors';
import { FontFamily, FontSize } from 'public/fonts';

export const Normal = styled(Text)<
  ViewStyle & ColorProps & TypographyProps & TextProps & SpaceProps
>`
  color: ${Colors.black};
  font-size: ${FontSize.Regular};
  font-family: ${FontFamily.Regular};
  text-align: left;
  ${layout};
  ${color};
  ${space};
  ${typography};
`;

export const Black = styled(Normal)`
  font-family: ${FontFamily.Black};
`;

export const Regular = styled(Normal)`
  font-family: ${FontFamily.Regular};
`;

export const ExtraBold = styled(Normal)`
  font-family: ${FontFamily.ExtraBold};
`;

export const Bold = styled(Normal)`
  font-family: ${FontFamily.Bold};
`;

export const SemiBold = styled(Normal)`
  font-family: ${FontFamily.SemiBold};
`;

export const Light = styled(Normal)`
  font-family: ${FontFamily.Light};
`;
