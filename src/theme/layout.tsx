import { View, ViewStyle, ViewProps, ScrollView as PlainScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { SpaceProps, space, color, border } from 'styled-system';

type ViewType = ViewStyle & ViewProps & SpaceProps;

export const Container = styled(View)<ViewType>(color, space, border);

export const Fill = styled(Container)`
  flex: 1;
`;

export const Row = styled(Container)`
  flex-direction: row;
`;

export const ScreenView = styled(SafeAreaView)<ViewType>`
  flex: 1;
  ${color};
  ${space};
  ${border};
`;

export const Circle = styled(Container)<CircleProps>`
  width: ${({ cr }) => cr}px;
  height: ${({ cr }) => cr}px;
  border-radius: ${({ cr }) => cr / 2}px;
  align-items: center;
  justify-content: center;
`;

export const ScrollView = styled(PlainScrollView)<ViewType>(color, space, border);

export const Divider = styled(Container)<DividerProps>`
  height: ${({ spacing }) => spacing || 1}px;
  margin-top: ${({ spacing }) => spacing || 0}px;
  margin-bottom: ${({ spacing }) => spacing || 0}px;
`;

interface CircleProps {
  cr: number;
}

interface DividerProps {
  height?: number;
  spacing?: number;
}
