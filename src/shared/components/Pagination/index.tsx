import React from 'react';
import { Pagination } from '@shopify/polaris';
import './pagination.scss';
import { ResponseHeaders } from '../../dtos/network.dto';

interface Props {
  pagination: ResponseHeaders;
  onNext: () => void;
  onPrevious: () => void;
}

const ListPagination: React.FC<Props> = ({ pagination, onNext, onPrevious }: Props) => (
  <div className="pagination-wrapper">
    <Pagination
      hasNext={Number(pagination['x-next-page']) > 1}
      hasPrevious={Number(pagination['x-page']) > 1}
      onNext={onNext}
      onPrevious={onPrevious}
      label={`${pagination['x-page'] || 1} of ${pagination['x-total-pages'] || 1}`}
    />
  </div>
);

export default ListPagination;
