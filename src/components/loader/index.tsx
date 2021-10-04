import React, { PureComponent, createRef } from 'react';

import { ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

import { Animations } from 'public/animations';
import { Colors } from 'public/colors';
import { Container } from 'theme/layout';

const CENTERED_STYLES: ViewStyle = {
  backgroundColor: Colors.white,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

/**
 * Renders a lottie animation component
 *
 * @export
 * @class Loader
 */
export class Loader extends PureComponent<Props, Record<string, unknown>> {
  private lottie = createRef<LottieView>();

  public constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    if (this.lottie.current) {
      this.lottie.current.play();
    }
  }

  public render() {
    const { fullscreen, size, onAnimationFinish, loop, progress, animation, duration } = this.props;
    const customStyles = fullscreen ? CENTERED_STYLES : {};
    const styles = getSizeStyles(size);

    return (
      <Container {...customStyles}>
        <LottieView
          ref={this.lottie as never}
          source={Animations[animation]}
          loop={loop}
          progress={progress}
          duration={duration}
          style={styles}
          onAnimationFinish={onAnimationFinish}
        />
      </Container>
    );
  }

  public play() {
    if (this.lottie.current) {
      this.lottie.current.play();
    }
  }
}
/**
 * @param size
 */
function getSizeStyles(size?: number) {
  return {
    width: size,
    height: size,
  };
}
/** Type definitions */
interface Props {
  animation: keyof typeof Animations;
  duration?: number;
  fullscreen?: boolean;
  loop?: boolean;
  progress?: number;
  size?: number;
  onAnimationFinish?(): void;
}
