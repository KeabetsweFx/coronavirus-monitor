import React, { useCallback, useRef, useState } from 'react';

import { omit } from 'lodash';
import { Image } from 'react-native';

import { Loader } from 'components/loader';
import { useStatsSummary } from 'modules/statistics/hooks/summary';
import { Colors } from 'public/colors';
import { FontSize } from 'public/fonts';
import { Images } from 'public/images';
import { Divider, ScrollView, Fill } from 'theme/layout';
import { SemiBold } from 'theme/typography';

import { FeaturedCountries } from './featured-countries';
import { WorldStats } from './world-stats';
import { styles } from './styles';

/**
 * Renders the stats main screen
 */
export function StatsComponent() {
  const loader = useRef<Loader>();
  const [isAnimationFinished, setAnimationFinished] = useState(false);
  const { isLoading, data, error } = useStatsSummary();

  const handleOnAnimationComplete = useCallback(() => {
    if (isLoading) {
      loader.current?.play();
    } else {
      setAnimationFinished(true);
    }
  }, [isLoading]);

  if (error) {
    return (
      <Fill backgroundColor={Colors.white} justifyContent="center" alignItems="center" px="20px">
        <Image style={styles.image} source={Images.coverall} />
        <SemiBold textAlign="center" mt="15px" fontSize={FontSize.H5}>
          Oops! Looks like something went wrong.
        </SemiBold>
      </Fill>
    );
  }

  if (!data || isLoading || !isAnimationFinished) {
    return (
      <Loader
        ref={loader as never}
        animation="covid-green"
        size={100}
        fullscreen
        onAnimationFinish={handleOnAnimationComplete}
        loop={false}
        duration={2400}
      />
    );
  }

  const stats = omit(data, 'Countries');

  return (
    <ScrollView
      flex={1}
      backgroundColor={Colors.white}
      pt="20px"
      contentContainerStyle={styles.contentContainerStyle}
    >
      <WorldStats {...stats} />
      <Divider spacing={10} backgroundColor={Colors.gallery} />
      <FeaturedCountries countries={data?.Countries} />
    </ScrollView>
  );
}
