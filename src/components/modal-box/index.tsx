import * as React from 'react';

import { Hub } from 'aws-amplify';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';

import { Colors } from 'public/colors';
import { AppChannels } from 'public/misc';

import { ModalEvents } from './events';
import { MODAL_ROUTES } from './routes';

const TIMING_ANIMATION = 400;

const DEFAULT_STATE: State = {
  isVisible: false,
  animationIn: undefined,
  animationOut: undefined,
  backdropColor: Colors.black,
  routeName: undefined,
  backdropOpacity: 0.7,
  onBackdropPress: undefined,
  animationInTiming: TIMING_ANIMATION,
  animationOutTiming: TIMING_ANIMATION,
  onHide: undefined,
};

const styles = StyleSheet.create({
  modal: {
    ...StyleSheet.absoluteFillObject,
    margin: 0,
    padding: 0,
  },
});

export class ModalBox extends React.PureComponent<Record<string, unknown>, State> {
  public static hide(onCompleted?: Callback) {
    Hub.dispatch(AppChannels.Modal, {
      event: ModalEvents.Hide,
      data: { onCompleted },
    });
  }

  public static update(routeName: Route, config: Config, onCompleted?: Callback) {
    Hub.dispatch(AppChannels.Modal, {
      event: ModalEvents.Update,
      data: { routeName, config, onCompleted },
    });
  }

  public static show(routeName: Route, config?: Config, onCompleted?: Callback) {
    Hub.dispatch(AppChannels.Modal, {
      event: ModalEvents.Show,
      data: { routeName, config, onCompleted },
    });
  }

  public constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      ...DEFAULT_STATE,
    };
    Hub.listen(AppChannels.Modal, this.listener.bind(this));
  }

  public componentWillUnmount() {
    Hub.remove(AppChannels.Modal, this.listener);
  }

  public render() {
    const {
      content,
      isVisible,
      onBackdropPress,
      backdropColor,
      animationIn,
      animationInTiming,
      animationOut,
      animationOutTiming,
      backdropOpacity,
    } = this.state;

    return (
      <Modal
        animationIn={animationIn}
        animationOut={animationOut}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        backdropColor={backdropColor}
        backdropOpacity={backdropOpacity}
        isVisible={isVisible}
        useNativeDriver={true}
        hideModalContentWhileAnimating
        onBackdropPress={onBackdropPress}
        style={styles.modal}
        onModalHide={this.onHide}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ ...StyleSheet.absoluteFillObject }}
        >
          {content}
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  public readonly hide = (onCompleted?: Callback) => {
    const { state } = this;

    this.setState({ ...state, isVisible: false }, onCompleted);
  };

  public listener(eventData: EventCapsule) {
    const { payload } = eventData;

    if (!payload || !payload.data) {
      return;
    }

    const { event, data } = payload;
    const { routeName, config, onCompleted } = data;

    switch (event) {
      case ModalEvents.Hide:
        return this.hide(onCompleted);
      case ModalEvents.Show:
        return this.show(routeName, config, onCompleted);
      case ModalEvents.Update:
        return this.update(routeName, config, onCompleted);
      default:
        break;
    }
  }

  private readonly onHide = () => {
    const { onHide } = this.state;

    if (!onHide || !onHide()) {
      this.hide();
    }
  };

  public readonly show = (routeName: Route, config?: Config, onCompleted?: Callback) => {
    const routeConfig = MODAL_ROUTES[routeName];

    if (!routeConfig) {
      throw new Error(`[ModalBox]: Route "${routeName}" does not exist.`);
    }

    this.setState(
      () => ({
        ...DEFAULT_STATE,
        ...routeConfig,
        ...config,
        isVisible: true,
        routeName,
      }),
      onCompleted
    );
  };

  public readonly update = (routeToUpdate: Route, config: Config, onCompleted?: Callback) => {
    const { routeName } = this.state;

    if (routeToUpdate !== routeName) {
      return;
    }

    this.setState(() => config, onCompleted);
  };
}

/** Type definitions */
export interface State {
  isVisible: boolean;
  content?: React.ReactNode;
  routeName?: Route;
  onBackdropPress?: ModalProps['onBackdropPress'];
  backdropColor?: ModalProps['backdropColor'];
  animationIn?: ModalProps['animationIn'];
  animationOut?: ModalProps['animationOut'];
  animationInTiming?: ModalProps['animationInTiming'];
  animationOutTiming?: ModalProps['animationOutTiming'];
  backdropOpacity?: ModalProps['backdropOpacity'];
  onHide?(): boolean | void;
}

type Config = Omit<State, 'isVisible'>;
type Route = keyof typeof MODAL_ROUTES;

interface EventCapsule {
  payload: EventPayload;
}

interface EventPayload {
  event: string;
  data?: ModalProperties;
}

type Callback = () => void;
interface ModalProperties {
  config: Config;
  onCompleted: Callback;
  routeName: Route;
}
