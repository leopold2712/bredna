import moment, { Moment } from 'moment';

export const mapDateAndTime = (
  date: Moment,
  time: { start: Date; end: Date },
): {
  start: Moment;
  end: Moment;
} => {
  const actualDate = date.format('YYYY.MM.DD');

  const startTime = moment(time.start).format('HH:mm:ss');
  const endTime = moment(time.end).format('HH:mm:ss');

  return {
    start: moment(`${actualDate} ${startTime}`, 'YYYY.MM.DD HH:mm:ss'),
    end: moment(`${actualDate} ${endTime}`, 'YYYY.MM.DD HH:mm:ss'),
  };
};
