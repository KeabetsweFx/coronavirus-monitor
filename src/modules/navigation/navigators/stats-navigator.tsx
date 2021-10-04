import React, { useCallback } from 'react';

import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { StatusBar, TouchableOpacity } from 'react-native';
import { enableScreens } from 'react-native-screens';

import { Colors } from 'public/colors';
import { StatsScreen } from 'screens/stats/main';
import { CountryListScreen } from 'screens/stats/country-list';
import { ReportCaseScreen } from 'screens/stats/report-case';
import { Container } from 'theme/layout';

import { TITLE_OPTIONS, BORDERED_HEADER_OPTIONS } from '../constants';
import { Routes } from '../routes';

enableScreens();
const StatsStack = createStackNavigator();

/**
 * Renders the account navigator
 *
 * @param props - account navigator props
 */
export function StatisticsNavigator(props: Props) {
  const { navigation } = props;

  const gotoReportCases = useCallback(() => {
    navigation.navigate(Routes.Stats.ReportCase);
  }, [navigation]);

  return (
    <>
      <StatsStack.Navigator screenOptions={{ ...BORDERED_HEADER_OPTIONS, ...TITLE_OPTIONS }}>
        <StatsStack.Screen
          options={{
            title: 'Statistics',
            headerRight: () => (
              <TouchableOpacity onPress={gotoReportCases}>
                <Container height={40} width={50} justifyContent="center" alignItems="center">
                  <Feather name="plus" color={Colors.black} size={25} />
                </Container>
              </TouchableOpacity>
            ),
          }}
          name={Routes.Stats.Main}
          component={StatsScreen}
        />
        <StatsStack.Screen
          options={{ title: 'Country stats' }}
          name={Routes.Stats.CountryList}
          component={CountryListScreen}
        />
        <StatsStack.Screen
          options={{ title: 'Report case' }}
          name={Routes.Stats.ReportCase}
          component={ReportCaseScreen}
        />
      </StatsStack.Navigator>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
    </>
  );
}

/** Type definitions */
export type StatsStackParamList = Record<string, undefined>;
// type ScreenRouteProp = RouteProp<StatsStackParamList, keyof StatsStackParamList>;
type ScreenNavigationProp = StackNavigationProp<StatsStackParamList, keyof StatsStackParamList>;

interface Props {
  // route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
}
