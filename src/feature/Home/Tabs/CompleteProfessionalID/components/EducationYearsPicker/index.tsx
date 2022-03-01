import React, { useEffect, useState } from 'react';
import { Icon, Popover, TextField } from '@shopify/polaris';
import { SelectMinor } from '@shopify/polaris-icons';
import moment from 'moment';
import { fillEducationYears } from '../../../../utils/fillEducationYears';
import { ScrollableList } from '../../../../../../shared/components/ScrollableList';

type Props = {
  label: string;
  selected: number;
  onChange: (value: string) => void;
  error?: string | boolean;
  prefferedValue?: number;
};

const educationYears = fillEducationYears();

export const YearPicker = ({
  label,
  selected,
  onChange,
  error,
  prefferedValue,
}: Props): JSX.Element => {
  const [list, setList] = useState(educationYears);

  const [value, setValue] = useState(selected.toString());
  const [inputError, setInputError] = useState<string | boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldFilterStartList, setShouldFilterStartList] = useState(false);

  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);

  const handleOnBlur = () => {
    /* synthetic delay to update list after SP animation is done */
    setTimeout(() => {
      setShouldFilterStartList(false);
      setList(educationYears);
      if (value.length !== 4) {
        setInputError('Wrong format');
      } else if (+value !== selected) {
        onChange(value);
      }
    }, 300);
  };

  const handleStartInput = (value: string) => {
    if (inputError) {
      setInputError(false);
    }
    if (!shouldFilterStartList) {
      setShouldFilterStartList(true);
    }
    setValue(value);
  };

  const handleYearChange = (date: Date) => {
    onChange(moment(date).format('YYYY'));
    setIsOpen(false);
  };

  useEffect(() => {
    if (shouldFilterStartList) {
      setList(educationYears.filter((year) => year.label.includes(value)));
    }
  }, [value, shouldFilterStartList]);

  useEffect(() => {
    setValue(selected.toString());
  }, [selected]);

  const activator = (
    <TextField
      label={label}
      value={value}
      onChange={handleStartInput}
      suffix={<Icon source={SelectMinor} />}
      onFocus={openPopover}
      error={error || inputError}
      onBlur={handleOnBlur}
    />
  );
  return (
    <Popover
      active={isOpen}
      activator={activator}
      onClose={closePopover}
      preferInputActivator={false}
      fullWidth
    >
      <ScrollableList
        onChange={handleYearChange}
        options={list}
        selected={
          prefferedValue
            ? moment(prefferedValue, 'YYYY').toDate()
            : moment(selected, 'YYYY').toDate()
        }
        isOpen
      />
    </Popover>
  );
};
