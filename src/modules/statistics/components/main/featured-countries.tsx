import React, { useState, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeSyntheticEvent } from 'react-native';
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from '@react-native-segmented-control/segmented-control';

import { Button } from 'components/button';
import { Routes } from 'modules/navigation/routes';
import { CountryItem } from 'modules/statistics/components/shared/country-item';
import { StatsSummary, Country } from 'modules/statistics/types/summary';
import { useCountryStatsFilter } from 'modules/statistics/hooks/country-sort';
import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { Container } from 'theme/layout';
import { Bold, SemiBold } from 'theme/typography';

const MAX_COUNTRIES = 5;

/**
 * Renders featured countries component
 *
 * @param props -  Renders the featured countries
 */
export function FeaturedCountries(props: Props) {
  const navigation = useNavigation();
  const { countries } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { sorted, orderKey } = useCountryStatsFilter(selectedIndex, countries);
  const featured = sorted.slice(0, MAX_COUNTRIES);

  const handleOnChange = (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
  };

  const gotoCountryList = useCallback(() => {
    navigation.navigate(Routes.Stats.CountryList as never);
  }, [navigation]);

  const renderCountries = useCallback(
    (country: Country, index: number) => {
      return <CountryItem key={country.Country} filter={orderKey} order={index + 1} {...country} />;
    },
    [orderKey]
  );

  return (
    <Container pt={15}>
      <Container pb={15} px={20}>
        <Bold fontSize={FontSize.H4}>Rest of the world</Bold>
      </Container>
      <Container px={20} pb={15}>
        <SegmentedControl
          values={['Total cases', 'Active cases', 'Deaths']}
          selectedIndex={selectedIndex}
          onChange={handleOnChange}
          appearance="light"
        />
      </Container>
      <Container pb={15}>{featured.map(renderCountries)}</Container>
      <Container px={20} pb={15}>
        <Button backgroundColor={Colors['royal-blue']} rounded onPress={gotoCountryList}>
          <SemiBold color={Colors.white} fontSize={FontSize.Medium}>
            See more
          </SemiBold>
        </Button>
      </Container>
    </Container>
  );
}
/** Type definitions */
interface Props {
  countries?: StatsSummary['Countries'];
}
