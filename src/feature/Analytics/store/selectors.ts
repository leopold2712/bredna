import type { RootState } from '../../../main/store/rootReducer';
import type { AnalyticsItemDTO } from '../dtos/analyticsItem.dto';

export const getOrders = (state: RootState): AnalyticsItemDTO[] => state.analytics.orders;
export const getCustomers = (state: RootState): AnalyticsItemDTO[] => state.analytics.customers;
