import { ActionList, ActionListItemDescriptor, Popover, TextField } from '@shopify/polaris';
import React, { FC, useState, useEffect } from 'react';
import { SimpleType } from '../../../../shared/dtos/simple.dto';

type Props = {
  items: SimpleType[];
  handleDegreeSelect: (field: string) => void;
  selectedDegree: string;
  error: string | boolean;
  label: string;
  placeholder: string;
  disabled?: boolean;
};

export const EducationPopover: FC<Props> = ({
  items,
  selectedDegree,
  handleDegreeSelect,
  error,
  label,
  placeholder,
  disabled = false,
}: Props): JSX.Element => {
  const [popoverActive, setPopoverActive] = useState(false);
  const togglePopoverActive = () => setPopoverActive((prev) => !prev);
  const [inputValue, setInputValue] = useState('');
  const [actionListItems, setActionListItems] = useState<ActionListItemDescriptor[]>([]);

  const handleInputValue = (value: string) => {
    setInputValue(value);
    if (value === '') handleDegreeSelect('');
  };

  useEffect(() => {
    if (selectedDegree) setInputValue(selectedDegree);
  }, [selectedDegree]);

  const updateList = () => {
    const elementFromInput = {
      content: inputValue,
      onAction: () => {
        handleDegreeSelect(inputValue);
        togglePopoverActive();
      },
    };

    const resultList = [...items.filter((item) => item.name.includes(inputValue))].map((item) => ({
      content: item.name,
      onAction: () => {
        handleDegreeSelect(item.name);
        togglePopoverActive();
      },
    }));

    resultList.push(elementFromInput);

    setActionListItems(resultList);
  };

  useEffect(() => {
    updateList();
  }, [inputValue, items]);

  const activator = (
    <TextField
      label={label}
      onFocus={() => setPopoverActive(true)}
      onChange={handleInputValue}
      placeholder={placeholder}
      value={inputValue}
      error={error}
      autoComplete={false}
      onBlur={() => handleDegreeSelect(inputValue)}
      disabled={disabled}
    />
  );
  return (
    <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive} fullWidth>
      <ActionList items={actionListItems} />
    </Popover>
  );
};
