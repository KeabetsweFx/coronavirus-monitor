import styled from 'styled-components';
import { border } from 'styled-system';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { Colors } from 'public/colors';
import { Container } from 'theme/layout';

export const Panel = styled(Container)`
  background-color: ${Colors.white};
  border-radius: 15px;
  overflow: hidden;
  padding-top: 40px;
  padding-bottom: 30px;
  position: relative;
`;

export const Close = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${Colors.gallery};
`;

export const FormControl = styled(TouchableOpacity)<ViewStyle>`
  border-width: 1px;
  padding-horizontal: 10px;
  align-items: center;
  height: 50px;
  border-radius: 6px;
  flex-direction: row;
  ${border};
`;

export const ListItem = styled(Container)`
  border-top-width: 1px;
  border-top-color: ${Colors.gallery};
  padding-top: 15px;
  padding-horizontal: 20px;
`;
