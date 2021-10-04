import styled from 'styled-components';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Colors } from 'public/colors';
import { Container } from 'theme/layout';

export const ListItem = styled(TouchableOpacity)`
  flex-direction: row;
  padding-vertical: 15px;
  padding-horizontal: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gallery};
  align-items: center;
`;

export const HeaderContainer = styled(Container)`
  align-items: center;
  height: 64px;
  justify-content: center;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${Colors.mischka};
  background-color: ${Colors.white};
  position: relative;
`;

export const Close = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10px;
`;
