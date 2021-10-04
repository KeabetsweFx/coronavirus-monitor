import React from 'react';

import {
  createBottomTabNavigator,
  BottomTabScreenProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

import { ModalBox } from 'components/modal-box';
import { Sheet } from 'components/sheet';
import { Colors } from 'public/colors';
import { CoronavirusMonitorIcon } from 'theme/icons';

import { InformationNavigator } from './info-navigator';
import { StatisticsNavigator } from './stats-navigator';
import { Routes } from '../routes';

const TABBAR_OPTIONS: BottomTabNavigationOptions = {
  tabBarActiveTintColor: Colors.black,
  tabBarInactiveTintColor: Colors.waterloo,
  tabBarActiveBackgroundColor: Colors.white,
  tabBarInactiveBackgroundColor: Colors.white,
  tabBarShowLabel: false,
  headerShown: false,
};

const DEFAULT_OPTIONS = <
  T extends Record<string, Record<string, unknown> | undefined>,
  K extends string
>({
  route,
}: BottomTabScreenProps<T, K>) => ({
  tabBarIcon: ({ color }: TabIconProps) => {
    switch (route.name) {
      case Routes.App.Stats:
        return <CoronavirusMonitorIcon name="chart" size={30} color={color} />;
      case Routes.App.Info:
        return <CoronavirusMonitorIcon name="information" size={30} color={color} />;
      default:
        return null;
    }
  },
});

const Tab = createBottomTabNavigator();

/**
 * Renders the auth navigator
 */
export function AppNavigator() {
  return (
    <>
      <Tab.Navigator screenOptions={DEFAULT_OPTIONS as never}>
        <Tab.Screen
          options={TABBAR_OPTIONS}
          name={Routes.App.Stats}
          component={StatisticsNavigator}
        />
        <Tab.Screen
          options={TABBAR_OPTIONS}
          name={Routes.App.Info}
          component={InformationNavigator}
        />
      </Tab.Navigator>
      <ModalBox />
      <Sheet />
    </>
  );
}

/** Type definitions */
interface TabIconProps {
  color: string;
}
