import { ResponseHeaders } from '../dtos/network.dto';

export const initialPagination: ResponseHeaders = {
  'x-next-page': null,
  'x-offset': '0',
  'x-page': '1',
  'x-per-page': '20',
  'x-prev-page': '1',
  'x-total': '0',
  'x-total-pages': '1',
};
