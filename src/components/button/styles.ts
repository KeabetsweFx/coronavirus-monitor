import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { border, space } from 'styled-system';

import { Colors } from 'public/colors';
import { Container } from 'theme/layout';

export const ButtonWrapper = styled(TouchableOpacity)`
  height: 50px;
  ${border};
  ${space};
  overflow: hidden;
`;

export const ButtonContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
  flex: 1;
  border-width: 1px;
  border-color: ${Colors.transparent};
`;
