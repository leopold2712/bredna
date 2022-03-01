import { AnalyticsItemDTO } from '../dtos/analyticsItem.dto';
import { AnalyticsTableDTO } from '../dtos/analyticsTable.dto';

export type orderSliceState = {
  orders: AnalyticsItemDTO[];
  customers: AnalyticsItemDTO[];
  table?: AnalyticsTableDTO;
  analyticsLoading: boolean;
  initialAnalyticsLoaded: boolean;
};
