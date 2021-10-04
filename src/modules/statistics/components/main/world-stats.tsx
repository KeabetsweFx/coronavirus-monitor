import React from 'react';

import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

import { Colors } from 'public/colors';
import { FontFamily, FontSize } from 'public/fonts';
import { StatsSummary } from 'modules/statistics/types/summary';
import { formatFigure } from 'modules/statistics/helpers/format';
import { Container } from 'theme/layout';
import { Bold, SemiBold } from 'theme/typography';

const CHART_CONFIG = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};
const SCREEN_WIDTH = Dimensions.get('screen').width;
const CHART_CENTER = { x: 0, y: -10 };
const DATA_CONSTANTS = {
  legendFontColor: Colors.black,
  legendFontSize: 15,
  legendFontFamily: FontFamily.SemiBold,
};

/**
 * Renders the world stats component
 *
 * @param props - World stats components
 */
export function WorldStats(props: Props) {
  const { Global } = props;
  const updatedAt = new Date(Global.Date).toLocaleDateString();
  const TotalActive = Global.TotalConfirmed - Global.TotalDeaths - Global.TotalRecovered;

  const data = [
    {
      name: 'Active',
      cases: TotalActive,
      color: Colors.yellow,
      ...DATA_CONSTANTS,
    },
    {
      name: 'Recovered',
      cases: Global.TotalRecovered,
      color: Colors['caribbean-green'],
      ...DATA_CONSTANTS,
    },
    {
      name: 'Deaths',
      cases: Global.TotalDeaths,
      color: Colors.carnation,
      ...DATA_CONSTANTS,
    },
  ];

  return (
    <Container>
      <Container px={20}>
        <Bold fontSize={FontSize.H4}>World</Bold>
        <SemiBold fontSize={FontSize.Jumbo}>{formatFigure(Global.TotalConfirmed)}</SemiBold>
        <Bold fontSize={FontSize.Regular}>TOTAL CASES</Bold>
      </Container>
      <PieChart
        data={data}
        width={SCREEN_WIDTH}
        height={220}
        chartConfig={CHART_CONFIG}
        accessor="cases"
        backgroundColor="transparent"
        paddingLeft="0"
        center={[CHART_CENTER.x, CHART_CENTER.y]}
        absolute
      />
      <Container px={20}>
        <Bold fontSize={FontSize.Small}>Updated at {updatedAt}</Bold>
      </Container>
    </Container>
  );
}
/** Type definitions */
type Props = Omit<StatsSummary, 'Countries'>;
