import { ScrollView, Image, ViewStyle } from 'react-native';
import styled from 'styled-components';
import { layout, space } from 'styled-system';

import { Colors } from 'public/colors';
import { Container } from 'theme/layout';

export const Carousel = styled(ScrollView)``;

export const CarouselItem = styled(Container)`
  width: 140px;
  height: 160px;
  padding-horizontal: 15px;
  padding-vertical: 15px;
  margin-right: 15px;
  border-radius: 15px;
`;

export const Icon = styled(Image)<ViewStyle>`
  ${layout};
  ${space};
`;

export const ListItem = styled(Container)`
  flex-direction: row;
  background-color: ${Colors.zircon};
  border-radius: 15px;
  padding-vertical: 15px;
  padding-horizontal: 15px;
  margin-bottom: 15px;
  align-items: center;
`;

export const IconContainer = styled(Container)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors['royal-blue']};
`;
