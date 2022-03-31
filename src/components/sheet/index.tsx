import React, { createRef } from 'react';

import {
  BottomSheetModalProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { Hub } from 'aws-amplify';

import { AppChannels } from 'public/misc';
import { SheetEvents } from './events';
import { SHEET_ROUTES } from './routes';

const DEFAULT_STATE: State = {
  snapPoints: ['80%'],
};

export class Sheet extends React.PureComponent<Record<string, unknown>, State> {
  private bottomSheet = createRef<BottomSheetModal>();

  public static hide(onCompleted?: Callback) {
    Hub.dispatch(AppChannels.Sheet, {
      event: SheetEvents.Hide,
      data: { onCompleted },
    });
  }

  public static update(routeName: Route, config: Config, onCompleted?: Callback) {
    Hub.dispatch(AppChannels.Sheet, {
      event: SheetEvents.Update,
      data: { routeName, config, onCompleted },
    });
  }

  public static show(routeName: Route, config?: Config, onCompleted?: Callback) {
    Hub.dispatch(AppChannels.Sheet, {
      event: SheetEvents.Show,
      data: { routeName, config, onCompleted },
    });
  }

  public constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      ...DEFAULT_STATE,
    };
    Hub.listen(AppChannels.Sheet, this.listener.bind(this));
  }

  public componentWillUnmount() {
    Hub.remove(AppChannels.Sheet, this.listener);
  }

  public render() {
    const { content, snapPoints, ...rest } = this.state;

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          snapPoints={snapPoints!}
          backdropComponent={this.renderBackdrop}
          onDismiss={this.onHide}
          ref={this.bottomSheet}
          {...rest}
        >
          {content}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  }

  public readonly hide = (onCompleted?: Callback) => {
    const { state } = this;

    if (this.bottomSheet) {
      this.bottomSheet.current?.dismiss();
      this.setState({ ...state }, onCompleted);
    }
  };

  public listener(eventData: EventCapsule) {
    const { payload } = eventData;

    if (!payload || !payload.data) {
      return;
    }

    const { event, data } = payload;
    const { routeName, config, onCompleted } = data;

    switch (event) {
      case SheetEvents.Hide:
        return this.hide(onCompleted);
      case SheetEvents.Show:
        return this.show(routeName, config, onCompleted);
      case SheetEvents.Update:
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
    const routeConfig = SHEET_ROUTES[routeName];

    if (!routeConfig) {
      throw new Error(`[Sheet]: Route "${routeName}" does not exist.`);
    }

    if (this.bottomSheet) {
      this.bottomSheet.current?.present();

      this.setState(
        () => ({
          ...DEFAULT_STATE,
          ...routeConfig,
          ...config,
          routeName,
        }),
        onCompleted
      );
    }
  };

  public readonly update = (routeToUpdate: Route, config: Config, onCompleted?: Callback) => {
    const { routeName } = this.state;

    if (routeToUpdate !== routeName) {
      return;
    }

    this.setState(() => config, onCompleted);
  };

  private renderBackdrop = (props: BottomSheetBackdropProps) => {
    return <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props} />;
  };
}

export interface State extends Omit<BottomSheetModalProps, 'children' | 'snapPoints'> {
  content?: React.ReactNode;
  routeName?: Route;
  snapPoints?: BottomSheetModalProps['snapPoints'];
  onCancel?(): boolean | void;
  onClose?(): boolean | void;
  onHide?(): boolean | void;
}

type Config = State;
type Route = keyof typeof SHEET_ROUTES;

interface EventCapsule {
  payload: EventPayload;
}

interface EventPayload {
  event: string;
  data?: SheetProperties;
}

type Callback = () => void;
interface SheetProperties {
  config: Config;
  onCompleted: Callback;
  routeName: Route;
}
