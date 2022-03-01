import React, { FC } from 'react';
import search from '../../../assets/images/Search.png';
import './emptySearch.scss';

type Props = {
  itemName?: string;
};

const EmptySearch: FC<Props> = ({ itemName }: Props) => (
  <div className="empty-search__wrapper">
    <img src={search} alt="search" />
    {itemName && (
      <>
        <p className="empty-search__heading">{`No ${itemName}s found`}</p>
        <p className="empty-search__description">Try changing the filters or search term</p>
      </>
    )}
  </div>
);

export default EmptySearch;
