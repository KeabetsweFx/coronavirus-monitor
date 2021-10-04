import React, { useCallback, memo } from 'react';

import Feather from 'react-native-vector-icons/Feather';

import { ModalBox } from 'components/modal-box';
import { CountryStats } from 'modules/statistics/components/shared/country-stats';
import { Country } from 'modules/statistics/types/summary';
import { StatsFilter } from 'modules/statistics/types/stats';
import { formatFigure } from 'modules/statistics/helpers/format';
import { FILTER_MAP } from 'modules/statistics/helpers/sort';
import { Colors } from 'public/colors';
import { Fill, Container } from 'theme/layout';
import { SemiBold } from 'theme/typography';

import { ListItem } from './styles';

/**
 * Renders the country item component
 *
 * @param props - Country item props
 */
function CountryItemComponent(props: Props) {
  const { order, filter, ...country } = props;
  const key = FILTER_MAP[filter];
  const value = key
    ? country[key]
    : country.TotalConfirmed - country.TotalRecovered - country.TotalDeaths;

  const handleOnPress = useCallback(() => {
    ModalBox.show('country-stats', {
      content: <CountryStats country={country} />,
    });
  }, [country]);

  return (
    <ListItem onPress={handleOnPress}>
      <SemiBold color={Colors.dusty}>{order}</SemiBold>
      <Fill ml="5px">
        <SemiBold>{country.Country}</SemiBold>
      </Fill>
      <Container alignItems="flex-end">
        <SemiBold>{formatFigure(value)}</SemiBold>
      </Container>
      <Container pl="10px">
        <Feather name="chevron-right" color={Colors.dusty} size={20} />
      </Container>
    </ListItem>
  );
}
export const CountryItem = memo(CountryItemComponent);

/** Type definitions */
interface Props extends Country {
  order: number;
  filter: StatsFilter;
}
