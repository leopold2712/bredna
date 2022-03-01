import moment from 'moment';

export const fillEducationYears = (): { label: string; value: string }[] => {
  const years = [];
  for (let i = moment().year() - 60; i <= moment().year(); i += 1) {
    years.push({ label: i.toString(), value: i.toString() });
  }

  return years;
};
