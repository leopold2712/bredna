/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import moment from 'moment';
import store from '../../../main/store';
import type {
  KlaviyoLoginRequestDTO,
  KlaviyoPublishEventRequestDTO,
  KlaviyoPublishVodRequestDTO,
  KlaviyoResetPasswordRequestDTO,
  KlaviyoSignupRequestDTO,
  KlaviyoUpdateProfileRequestDTO,
  KlaviyoPublishHubRequestDTO,
  KlaviyoUpdateMeRequestDTO,
  KlaviyoCouponRequestDTO,
  KlaviyoEventWithoutParticipantsRequestDTO,
  KlaviyoExpertProfileRequestDTO,
  KlaviyoUpdateUserPropertyRequestDTO,
  KlaviyoSignupDTO,
  KlaviyoLoginDTO,
  KlaviyoUpdateMeDTO,
  KlaviyoProfileDTO,
  KlaviyoHubDTO,
  KlaviyoEventDTO,
  KlaviyoCouponDTO,
  KlaviyoVodDTO,
  KlaviyoExpertProfileDTO,
  KlaviyoUserPropertiesDTO,
} from './dtos';

type TrackArgument =
  | KlaviyoLoginRequestDTO
  | KlaviyoPublishEventRequestDTO
  | KlaviyoPublishVodRequestDTO
  | KlaviyoResetPasswordRequestDTO
  | KlaviyoSignupRequestDTO
  | KlaviyoUpdateProfileRequestDTO
  | KlaviyoPublishHubRequestDTO
  | KlaviyoUpdateMeRequestDTO
  | KlaviyoCouponRequestDTO
  | KlaviyoEventWithoutParticipantsRequestDTO
  | KlaviyoExpertProfileRequestDTO;

type IdentifyArgument = KlaviyoUpdateUserPropertyRequestDTO;

export class Klaviyo {
  private static TOKEN = process.env.REACT_APP_KLAVIYO_API_KEY || '';

  public static async signup(user: KlaviyoSignupDTO): Promise<void> {
    const { email, first_name, last_name } = user;

    const klaviyoData: KlaviyoSignupRequestDTO = {
      token: this.TOKEN,
      event: 'SIGN UP',
      customer_properties: {
        email,
        first_name,
        last_name,
      },
      properties: {
        email,
        first_name,
        last_name,
        created_at: moment(),
      },
    };

    await this.track(klaviyoData);
  }

  public static async login(loginData: KlaviyoLoginDTO): Promise<void> {
    const { email, first_name, last_name, phone_number, expertise, preferred_language } = loginData;

    const klaviyoData: KlaviyoLoginRequestDTO = {
      token: this.TOKEN,
      event: 'LOG IN',
      customer_properties: {
        email,
      },
      properties: {
        email,
        first_name,
        last_name,
        phone_number,
        expertise,
        preferred_language: preferred_language?.name,
        created_at: moment(),
      },
    };

    await this.track(klaviyoData);
  }

  public static async resetPassword(email: string): Promise<void> {
    const klaviyoData: KlaviyoResetPasswordRequestDTO = {
      token: this.TOKEN,
      event: 'RESET PASSWORD',
      customer_properties: {
        email,
      },
      properties: {
        email,
        created_at: moment(),
      },
    };

    await this.track(klaviyoData);
  }

  public static async updateMe(meData: KlaviyoUpdateMeDTO): Promise<void> {
    const { email, first_name, last_name, phone_number } = meData;

    const klaviyoData: KlaviyoUpdateMeRequestDTO = {
      token: this.TOKEN,
      event: 'UPDATE ME',
      customer_properties: {
        email,
        phone_number,
        first_name,
        last_name,
      },
      properties: {
        email,
        phone_number,
        first_name,
        last_name,
        created_at: moment(),
      },
    };

    await this.track(klaviyoData);
  }

  public static async publishEvent(eventData: KlaviyoEventDTO): Promise<void> {
    const { user } = store.getState().auth;
    const { languages } = store.getState().meta;

    const {
      name,
      subtitle,
      description,
      disclaimer,
      price,
      currency,
      starts_at,
      exclude_from_pass,
      confirmation_message,
      participant_limit,
      cancellation_buffer,
      link,
      instruction_language_id,
      thumbnail,
    } = eventData;

    const klaviyoData: KlaviyoPublishEventRequestDTO = {
      token: this.TOKEN,
      event: 'PUBLISH EVENT',
      customer_properties: {
        email: user?.email,
      },
      properties: {
        title: name,
        subtitle,
        event_description: description,
        image: thumbnail,
        price,
        currency,
        date: moment(starts_at).format('YYYY-MM-DD'),
        time: moment(starts_at).format('hh:mm a'),
        exclude_from_pass,
        confirmation_message,
        participant_limit,
        language: languages.find((lang) => lang.id === instruction_language_id)?.name,
        cancellation_window: cancellation_buffer,
        disclaimer,
        link,
        created_at: moment(),
      },
    };

    await this.track(klaviyoData);
  }

  public static async publishVod(vodData: KlaviyoVodDTO): Promise<void> {
    const { user } = store.getState().auth;
    const {
      name,
      subtitle,
      description,
      disclaimer,
      price,
      currency,
      video_duration,
      exclude_from_pass,
      confirmation_message,
      link,
    } = vodData;

    const klaviyoData: KlaviyoPublishVodRequestDTO = {
      token: this.TOKEN,
      event: 'PUBLISH VOD',
      customer_properties: {
        email: user?.email,
      },
      properties: {
        title: name,
        subtitle,
        video_description: description,
        video: link,
        price,
        currency,
        duration: video_duration,
        eligibility: exclude_from_pass,
        disclaimer,
        confirmation_message,
        created_at: moment(),
      },
    };

    await this.track(klaviyoData);
  }

  public static async createCoupon(couponData: KlaviyoCouponDTO): Promise<void> {
    const { user } = store.getState().auth;
    const { name, discount_amount, discount_currency, discount_percent, expires_at } = couponData;

    const klaviyoData: KlaviyoCouponRequestDTO = {
      token: this.TOKEN,
      event: 'CREATE COUPON',
      customer_properties: {
        email: user?.email,
      },
      properties: {
        code: name,
        expires_at: moment(expires_at),
        type: discount_percent ? 'percentage' : 'fixed amount',
        discount_amount,
        discount_currency,
        discount_percent,
        created_at: moment(),
      },
    };

    await this.track(klaviyoData);
  }

  public static async checkEvents(
    events: { event_date: string; users_subscribed: number }[],
  ): Promise<void> {
    const { user } = store.getState().auth;
    let hasEventWithoutParticipants = false;
    let hasFutureEvent = false;

    events.forEach((event) => {
      if (moment(event.event_date) < moment()) {
        if (!event.users_subscribed) {
          hasEventWithoutParticipants = true;
        }
      } else {
        hasFutureEvent = true;
      }
    });

    await this.updateUserProperty({ has_future_event: hasFutureEvent });

    if (hasEventWithoutParticipants) {
      const klaviyoEventData: KlaviyoEventWithoutParticipantsRequestDTO = {
        token: this.TOKEN,
        event: 'EVENT WITHOUT PARTICIPANTS',
        customer_properties: {
          email: user?.email,
        },
        properties: {
          email: user?.email,
          created_at: moment(),
        },
      };

      await this.track(klaviyoEventData);
    }
  }

  public static async updateUserProperty(
    property: KlaviyoUserPropertiesDTO,
    email?: string,
  ): Promise<void> {
    const { user } = store.getState().auth;

    const klaviyoData: KlaviyoUpdateUserPropertyRequestDTO = {
      token: this.TOKEN,
      properties: {
        email: email || user?.email,
        ...property,
      },
    };

    await this.identify(klaviyoData);
  }

  private static track(data: TrackArgument) {
    // return axios.get(
    //   `https://a.klaviyo.com/api/track?data=${Buffer.from(JSON.stringify(data)).toString(
    //     'base64',
    //   )}`,
    // );
  }

  private static identify(data: IdentifyArgument) {
    // return axios.get(
    //   `https://a.klaviyo.com/api/identify?data=${Buffer.from(JSON.stringify(data)).toString(
    //     'base64',
    //   )}`,
    // );
  }
}
