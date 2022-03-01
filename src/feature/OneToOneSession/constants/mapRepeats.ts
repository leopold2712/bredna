import { RepeatOptionsNouns } from './repeatOptions';
import { RepeatOptions } from '.';

export const mapRepeats: { [key: string]: RepeatOptions } = {
  none: RepeatOptions.DOESNT_REPEAT,
  daily: RepeatOptions.DAILY,
  weekly: RepeatOptions.WEEKLY,
  monthly: RepeatOptions.MONTHLY,
};

export const mapRepeatsToNouns: { [key: string]: RepeatOptionsNouns } = {
  weekly: RepeatOptionsNouns.WEEK,
  monthly: RepeatOptionsNouns.MONTH,
};
