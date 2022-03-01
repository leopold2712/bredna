import moment from 'moment';

export const parseDateTime = (date: Date, time: Date): Date => {
  const parsedDate = moment(date).format('YYYY-MM-DD');
  const parsedTime = moment(time).format('hh:mm:ss');

  return moment(`${parsedDate}T${parsedTime}`).toDate();
};
