import React from 'react';

import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { Loader } from 'components/loader';
import { Country } from 'modules/statistics/types/summary';
import { formatFigure } from 'modules/statistics/helpers/format';
import { Colors } from 'public/colors';
import { FontSize, FontFamily } from 'public/fonts';
import { Fill, Container, Divider } from 'theme/layout';
import { Bold, Regular, SemiBold } from 'theme/typography';

const CHART_CONFIG = {
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};
const SCREEN_WIDTH = Dimensions.get('screen').width;
const WIDTH_OFFSET = 40;
const CHART_CENTER = { x: 0, y: -10 };
const DATA_CONSTANTS = {
  legendFontColor: Colors.black,
  legendFontSize: 15,
  legendFontFamily: FontFamily.SemiBold,
};

/**
 * Renders the country stats card
 *
 * @param props - country stats card props
 */
export function StatsCard(props: Props) {
  const { country } = props;

  if (!country) {
    return <Loader animation="dots" fullscreen size={40} />;
  }

  const TotalActive = country.TotalConfirmed - country.TotalDeaths - country.TotalRecovered;
  const updatedAt = new Date(country.Date).toLocaleDateString();
  const data = [
    {
      name: 'Active',
      cases: TotalActive,
      color: Colors.yellow,
      ...DATA_CONSTANTS,
    },
    {
      name: 'Recovered',
      cases: country.TotalRecovered,
      color: Colors['caribbean-green'],
      ...DATA_CONSTANTS,
    },
    {
      name: 'Deaths',
      cases: country.TotalDeaths,
      color: Colors.carnation,
      ...DATA_CONSTANTS,
    },
  ];

  return (
    <Fill>
      <Container mb="20px">
        <Bold fontSize={FontSize.H3} textAlign="center">
          {country.Country}
        </Bold>
      </Container>
      <Container mb="20px">
        <Regular>New cases at {updatedAt}</Regular>
        <SemiBold fontSize={FontSize.Jumbo} color={Colors.yellow}>
          +{formatFigure(country.NewConfirmed)}
        </SemiBold>
      </Container>
      <Container mb="20px">
        <Regular>Total cases</Regular>
        <SemiBold fontSize={FontSize.Title}>{formatFigure(country.TotalConfirmed)}</SemiBold>
      </Container>
      <Divider backgroundColor={Colors.gallery} />
      <Container alignItems="center">
        <PieChart
          data={data}
          width={SCREEN_WIDTH - WIDTH_OFFSET}
          height={210}
          chartConfig={CHART_CONFIG}
          accessor="cases"
          backgroundColor="transparent"
          paddingLeft="0"
          center={[CHART_CENTER.x, CHART_CENTER.y]}
          absolute
        />
      </Container>
    </Fill>
  );
}
/** Type definitions */
interface Props {
  country?: Country;
}
