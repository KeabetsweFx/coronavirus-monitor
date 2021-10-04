import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

import { Colors } from 'public/colors';

export const ListItem = styled(TouchableOpacity)`
  flex-direction: row;
  padding-vertical: 15px;
  padding-horizontal: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gallery};
  align-items: center;
`;
