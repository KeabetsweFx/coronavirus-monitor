import React from 'react';

import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { Container, ScrollView } from 'theme/layout';
import { Bold } from 'theme/typography';

import { PreventionsList } from './preventions-list';
import { SymptomsList } from './symptoms-list';

/**
 * Renders the information component
 */
export function InformationComponent() {
  return (
    <ScrollView flex={1} backgroundColor={Colors.white} showsVerticalScrollIndicator={false}>
      <Container px={20}>
        <Bold my={15} fontSize={FontSize.H4}>
          Symptoms
        </Bold>
      </Container>
      <SymptomsList />
      <Container px={20}>
        <Bold my={15} fontSize={FontSize.H4}>
          Preventions
        </Bold>
        <PreventionsList />
      </Container>
    </ScrollView>
  );
}
