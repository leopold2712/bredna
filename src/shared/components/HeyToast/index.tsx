import { Toast } from '@shopify/polaris';
import React from 'react';

type State = {
  isActive: boolean;
  text: string;
  duration?: number;
  isError?: boolean;
};

class HeyToast extends React.PureComponent<unknown, State> {
  private static ref: HeyToast | null = null;

  constructor(props: unknown) {
    super(props);
    this.state = {
      isActive: false,
      text: '',
    };
  }

  public static setRef(ref: HeyToast | null): void {
    HeyToast.ref = ref;
  }

  public static getRef(): HeyToast | null {
    return HeyToast.ref;
  }

  public static clearRef(): void {
    HeyToast.ref = null;
  }

  public static show({
    text,
    isError,
    duration,
  }: {
    text: string;
    isError?: boolean;
    duration?: number;
  }): void {
    HeyToast.ref?.setState({
      isActive: true,
      isError,
      duration,
      text,
    });
  }

  public static hide(): void {
    HeyToast.ref?.setState({
      isActive: false,
      isError: false,
      duration: undefined,
      text: '',
    });
  }

  public render(): JSX.Element | null {
    const { isActive, text, isError, duration } = this.state;
    return isActive ? (
      <Toast content={text} error={isError} duration={duration} onDismiss={() => HeyToast.hide()} />
    ) : null;
  }
}

export default HeyToast;
