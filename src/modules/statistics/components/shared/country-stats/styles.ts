import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

import { Colors } from 'public/colors';
import { Container } from 'theme/layout';

export const Panel = styled(Container)`
  background-color: ${Colors.white};
  border-radius: 15px;
  overflow: hidden;
  padding-horizontal: 20px;
  padding-top: 40px;
  padding-bottom: 30px;
  margin-bottom: 20px;
  margin-horizontal: 10px;
  height: 500px;
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
