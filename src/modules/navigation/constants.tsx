import React from 'react';

import { StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, Platform } from 'react-native';

import { Colors } from 'public/colors';
import { FontFamily } from 'public/fonts';
import { Container } from 'theme/layout';

export const DEFAULT_OPTIONS: StackNavigationOptions = {
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.white,
    shadowOpacity: 0,
    elevation: 0,
  },
  title: null as never,
  headerBackImage: () => (
    <Container ml={Platform.select({ default: 0, ios: 15 })}>
      <MaterialIcons name="arrow-back" color={Colors.black} size={25} />
    </Container>
  ),
  headerLeftContainerStyle: {
    margin: 0,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
export const BORDERED_HEADER_OPTIONS: StackNavigationOptions = {
  ...DEFAULT_OPTIONS,
  headerStyle: {
    backgroundColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.mischka,
    shadowOpacity: 0,
    elevation: 0,
  },
};

export const CLOSE_BUTTON_OPTIONS: StackNavigationOptions = {
  headerBackImage: () => (
    <Container ml={10}>
      <MaterialIcons name="close" color={Colors.black} size={25} />
    </Container>
  ),
};

export const TITLE_OPTIONS: StackNavigationOptions = {
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: FontFamily.SemiBold,
    color: Colors.black,
  },
  headerTitleAlign: 'center',
  title: null as never,
};

export const NO_HEADER_OPTIONS: StackNavigationOptions = {
  header: () => null,
};
