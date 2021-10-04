import { KeyboardAvoidingView, View } from 'react-native';
import styled from 'styled-components';

import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { Bold, Regular } from 'theme/typography';

export const Form = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${Colors.white};
  padding-horizontal: 20px;
  padding-top: 20px;
`;

export const Field = styled(View)`
  margin-top: 10px;
`;

export const Legend = styled(Bold)`
  font-size: ${FontSize.H3};
  color: ${Colors.black};
  line-height: 25px;
  margin-bottom: 10px;
`;

export const Description = styled(Regular)`
  font-size: ${FontSize.Regular};
  color: ${Colors.black};
  line-height: 20px;
  margin-bottom: 10px;
`;

export const ActionSection = styled(View)`
  margin-top: 20px;
`;
