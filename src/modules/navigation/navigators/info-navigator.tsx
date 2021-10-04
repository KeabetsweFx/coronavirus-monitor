import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { Colors } from 'public/colors';
import { InfoScreen } from 'screens/info/main';

import { BORDERED_HEADER_OPTIONS, TITLE_OPTIONS } from '../constants';
import { Routes } from '../routes';

enableScreens();
const InformationStack = createStackNavigator();

/**
 * Renders the information navigator
 */
export function InformationNavigator() {
  return (
    <>
      <InformationStack.Navigator screenOptions={{ ...BORDERED_HEADER_OPTIONS, ...TITLE_OPTIONS }}>
        <InformationStack.Screen
          options={{ title: 'Information' }}
          name={Routes.Info.Main}
          component={InfoScreen}
        />
      </InformationStack.Navigator>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
    </>
  );
}
