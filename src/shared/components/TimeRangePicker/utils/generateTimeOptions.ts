import moment from 'moment';

type OptionDescriptor = { value: string; label: string };

export const generateTimeOptions = (date: Date): OptionDescriptor[] => {
  const options: OptionDescriptor[] = [];
  const currentTime = moment(date).startOf('day');
  const nextDay = moment(date).add(1, 'day').startOf('day');
  while (currentTime.isBefore(nextDay)) {
    options.push({
      value: currentTime.toString(),
      label: currentTime.format('hh:mma'),
    });
    currentTime.add(30, 'minutes');
  }
  return options;
};
