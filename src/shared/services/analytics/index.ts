import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

export type AnalyticsEventObject = {
  category: string;
  action: string;
  label?: string;
};

export class AnalyticsService {
  private static reactGa: typeof ReactGA;

  private static reactPixel: typeof ReactPixel;

  private static isTestAccount: boolean;

  public static init(): void {
    this.reactGa = ReactGA;
    this.reactPixel = ReactPixel;
    this.isTestAccount = false;

    if (process.env.REACT_APP_GA_ID && process.env.REACT_APP_PROJECT_ENV === 'PROD') {
      this.reactGa.initialize(process.env.REACT_APP_GA_ID);
    }

    if (process.env.REACT_APP_FB_PIXEL_ID) {
      this.reactPixel.init(process.env.REACT_APP_FB_PIXEL_ID, undefined, {
        autoConfig: false,
        debug: false,
      });
    }
  }

  public static track(obj: AnalyticsEventObject): void {
    if (process.env.REACT_APP_GA_ID && !this.isTestAccount) this.reactGa.event(obj);
  }

  public static trackCustom(title: string, data?: Record<string, unknown>): void {
    // this.reactPixel.trackCustom(title, data);
  }

  public static pageView(): void {
    // this.reactPixel.pageView();
  }

  public static setIsTestAccount(param: boolean): void {
    this.isTestAccount = param;
  }
}

AnalyticsService.init();
