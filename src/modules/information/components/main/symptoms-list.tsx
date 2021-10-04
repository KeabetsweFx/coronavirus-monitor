import React from 'react';

import { symptoms } from 'modules/information/data/symptoms.json';
import { Colors } from 'public/colors';
import { Images } from 'public/images';
import { Fill } from 'theme/layout';
import { Bold } from 'theme/typography';
import { Carousel, CarouselItem, Icon } from './styles';

/**
 * Renders a list of covid 19 symptoms
 */
export function SymptomsList() {
  const renderItem = (item: typeof symptoms[0]) => {
    const { color, title, image } = item;

    return (
      <CarouselItem backgroundColor={Colors[color as never]} key={title}>
        <Fill alignItems="center">
          <Icon width={60} height={60} source={Images[image as keyof typeof Images]} />
        </Fill>
        <Bold color={Colors.white}>{title}</Bold>
      </CarouselItem>
    );
  };

  return (
    <Carousel
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20 }}>
      {symptoms.map(renderItem)}
    </Carousel>
  );
}
