import moment from 'moment';

export const findAndSetSelectedHour = (selected: Date, hours: string[]): string => {
  const hour = moment(selected).format('h:mma');

  let foundedRange = '';
  hours.forEach((range) => {
    if (range.startsWith(hour)) foundedRange = range;
  });

  return foundedRange;
};
