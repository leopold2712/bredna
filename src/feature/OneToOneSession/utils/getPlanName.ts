import moment from 'moment';
import { PlanDTO } from '../../../shared/dtos/plan.dto';
import { ProductTypes } from '../../../shared/constants/products.types';

export const getPlanName = (plan: PlanDTO): string => {
  const { name } = plan.product;
  let suffix = '';

  if (plan.product.type === ProductTypes.ChatComboPassProduct) {
    suffix = plan.total_credits ? ' (therapy)' : ' (chat)';
  }

  return `${name}${suffix}`;
};

export const getPlanExpiration = (plan: PlanDTO, length: number): string => {
  const name = getPlanName(plan);
  const expired = moment(plan.expires_at || new Date()).format('MMM DD, YYYY');

  return `${expired} ${length > 1 ? `(${name})` : ''}`;
};

export const getPlanUsage = (plan: PlanDTO, length: number): string => {
  const name = getPlanName(plan);
  const usage = plan.total_credits
    ? `${plan.used_credits}/${plan.total_credits}`
    : `Until ${moment(plan.expires_at).format('MMM DD, YYYY')}`;
  return `${usage} ${length > 1 ? ` (${name})` : ''}`;
};
