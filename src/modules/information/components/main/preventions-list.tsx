import React from 'react';

import { preventions } from 'modules/information/data/preventions.json';
import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { Images } from 'public/images';
import { Container, Fill } from 'theme/layout';
import { Bold, Regular } from 'theme/typography';

import { ListItem, IconContainer, Icon } from './styles';

/**
 * Renders the preventions list component
 */
export function PreventionsList() {
  const renderItem = (item: typeof preventions[0]) => {
    const { description, image, title } = item;

    return (
      <ListItem key={title}>
        <IconContainer>
          <Icon width={25} height={25} source={Images[image as keyof typeof Images]} />
        </IconContainer>
        <Fill ml={20}>
          <Bold fontSize={FontSize.H4} color={Colors.bossanova}>
            {title}
          </Bold>
          <Regular fontSize={FontSize.Medium} color={Colors.manatee}>
            {description}
          </Regular>
        </Fill>
      </ListItem>
    );
  };

  return <Container>{preventions.map(renderItem)}</Container>;
}
