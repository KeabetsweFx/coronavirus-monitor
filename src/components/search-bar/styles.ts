import styled from 'styled-components';
import { TextInput, Platform } from 'react-native';

import { Colors } from 'public/colors';
import { FontSize, FontFamily } from 'public/fonts';
import { Container } from 'theme/layout';

export const SearchInputContainer = styled(Container)`
  padding-vertical: ${Platform.select({ ios: 10, android: 0 })}px;
  padding-horizontal: 10px;
  background-color: ${Colors.white};
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.gallery};
  border-radius: 25px;
  height: 40px;
`;

export const SearchTextInput = styled(TextInput)`
  flex: 1;
  font-family: ${FontFamily.Regular};
  font-size: ${FontSize.Medium};
  background-color: ${Colors.white};
  color: ${Colors.black};
  background-color: ${Colors.gallery};
`;

export const SearchIconBox = styled(Container)`
  top: 0;
  bottom: 0;
  left: 0;
  width: 40px;
  justify-content: center;
  align-items: center;
`;
