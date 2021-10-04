import { Platform, TextInput } from 'react-native';
import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

import { Colors } from 'public/colors';
import { FontSize, FontFamily } from 'public/fonts';
import { Container } from 'theme/layout';

const IOS_PADDING = 10;
const INPUT_VERTICAL_PADDING = Platform.select({ ios: IOS_PADDING, android: 0 });

export const InputContainer = styled(Container)`
  padding-top: ${INPUT_VERTICAL_PADDING}px;
  padding-bottom: ${INPUT_VERTICAL_PADDING}px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${Colors.white};
  flex-direction: row;
  border-width: 1px;
  border-radius: 6px;
  align-items: center;
  height: 50px;
`;

export const InputControl = styled(TextInput)<SpaceProps>`
  flex: 1;
  font-family: ${FontFamily.Regular};
  font-size: ${FontSize.H4};
  background-color: ${Colors.white};
  color: ${Colors.black};
  ${space};
`;
