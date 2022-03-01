import React, { useState, useEffect } from 'react';
import { ActionList, ActionListItemDescriptor, Icon, Popover, TextField } from '@shopify/polaris';
import moment from 'moment';
import { SelectMinor } from '@shopify/polaris-icons';

type Props = {
  selectedYear: number;
  handleYearSelect: (year: string) => void;
  label: string;
  error: string | boolean;
  disabled?: boolean;
};

const fillEducationYears = () => {
  const years = [];
  for (let i = 1961; i <= moment().year(); i += 1) {
    years.push(String(i));
  }

  return years;
};

const educationYears = fillEducationYears();

export const EducationYearsPopover = ({
  selectedYear,
  handleYearSelect,
  label,
  error,
  disabled = false,
}: Props): JSX.Element => {
  const [popoverActive, setPopoverActive] = useState(false);
  const [value, setValue] = useState(selectedYear);
  const togglePopoverActive = () => setPopoverActive((prev) => !prev);
  const [list, setList] = useState<ActionListItemDescriptor[]>([]);

  const handleChange = (value: string) => {
    setValue(+value);
    handleYearSelect(value);
  };

  useEffect(() => {
    if (!value || !list.some((item) => item.content?.includes(String(value)))) {
      setList(
        educationYears.map((year) => ({
          content: year,
          onAction: () => {
            handleYearSelect(year);
            togglePopoverActive();
          },
        })),
      );
      return;
    }
    setList(
      educationYears
        .filter((v) => String(v).includes(String(value)))
        .map((year) => ({
          content: year,
          onAction: () => {
            handleYearSelect(year);
            togglePopoverActive();
          },
        })),
    );
    setPopoverActive(true);
  }, [value]);

  const activator = (
    <TextField
      onFocus={() => setPopoverActive(true)}
      value={String(selectedYear) || String(value)}
      label={label}
      onChange={handleChange}
      error={error}
      suffix={<Icon source={SelectMinor} />}
      autoComplete={false}
      disabled={disabled}
    />
  );
  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
      fullWidth
      preferInputActivator={false}
    >
      <ActionList items={list} />
    </Popover>
  );
};
