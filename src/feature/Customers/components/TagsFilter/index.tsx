import { OptionList } from '@shopify/polaris';
import React from 'react';
import { SimpleType } from '../../../../shared/dtos/simple.dto';
import './styles.overload.scss';

type Props = {
  tags: SimpleType[];
  selectedItems: string[];
  onChange: (selected: string[]) => void;
};

export const TagsFilter = ({ tags, selectedItems, onChange }: Props): JSX.Element => (
  <div className="tags__filter-overload">
    {tags.length > 0 ? (
      <OptionList
        onChange={onChange}
        options={tags.map((tag) => ({ label: tag.name, value: tag.name }))}
        selected={selectedItems}
        allowMultiple
      />
    ) : (
      <p className="clients__filter-tags">No tags added yet</p>
    )}
  </div>
);
