import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { SemiBold } from 'theme/typography';
import { Close, HeaderContainer } from './styles';

/**
 * Renders the header component
 *
 * @param props - header props
 */
export function Header(props: Props) {
  const { title, onClose } = props;

  return (
    <HeaderContainer>
      <SemiBold fontSize={FontSize.H4}>{title}</SemiBold>
      <Close onPress={onClose}>
        <MaterialIcons name="close" color={Colors.black} size={22} />
      </Close>
    </HeaderContainer>
  );
}

interface Props {
  title: string;
  onClose(): void;
}
