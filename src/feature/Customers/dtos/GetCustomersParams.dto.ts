import { ClientsSorting } from '../constants';

export type GetCustomersParams = {
  primitiveParams: {
    q?: string;
    nextInteractionFrom?: number;
    nextInteractionThrough?: number;
    sortBy?: ClientsSorting;
    sortDirection?: 'ASC' | 'DESC';
    page?: number;
    pageSize?: number;
    offset?: number;
  };
  referenceParams?: {
    productIds?: number[];
    tags?: string[];
  };
};
