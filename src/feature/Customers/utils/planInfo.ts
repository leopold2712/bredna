import moment from 'moment';
import type { CustomerDTO } from '../dtos/CustomerDTO';

export const getPaymentTypeInfo = (customer: CustomerDTO): string => {
  const { current_plan } = customer;
  if (current_plan) {
    return current_plan.name;
  }
  return 'Credit card';
};

export const getUsageTypeInfo = (customer: CustomerDTO): string => {
  const { current_plan } = customer;
  if (current_plan) {
    if (current_plan.hasOwnProperty('valid_until'))
      return `${moment(current_plan.valid_until).format('DD.MM.YYYY')}`;
    if (current_plan.hasOwnProperty('remaining_credits'))
      return `Used ${current_plan.remaining_credits} / ${current_plan.total_credits} entries`;
  }
  return '---';
};
