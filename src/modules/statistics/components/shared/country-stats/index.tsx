import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ModalBox } from 'components/modal-box';
import { Country } from 'modules/statistics/types/summary';
import { Colors } from 'public/colors';
import { Fill } from 'theme/layout';

import { StatsCard } from './stats-card';
import { Panel, Close } from './styles';

/**
 * Renders the country stats component
 *
 * @param props - Country stats props
 */
export function CountryStats(props: Props) {
  const { country } = props;

  const handleOnClose = () => {
    ModalBox.hide();
  };

  return (
    <Fill justifyContent="flex-end">
      <Panel>
        <StatsCard country={country} />
        <Close onPress={handleOnClose}>
          <MaterialIcons name="close" color={Colors.black} size={22} />
        </Close>
      </Panel>
    </Fill>
  );
}

/** Type definitions */
interface Props {
  country: Country;
}
