import React from 'react';
import { Button, OptionList, Popover } from '@shopify/polaris';
import { ClockMinor } from '@shopify/polaris-icons';
import moment from 'moment';
import { generateTimeOptions } from '../../utils/generateTimeOptions';
import { ScrollableList } from '../../../ScrollableList';

type Props = {
  active: boolean;
  value: Date;
  onChange: (date: Date) => void;
  togglePopoverActive: () => void;
  disabled?: boolean;
  error?: boolean;
};

export const TimePicker = ({
  active,
  togglePopoverActive,
  onChange,
  disabled,
  value,
  error,
}: Props): JSX.Element => {
  const parsedValue = moment(value).format('hh:mma');

  const times = generateTimeOptions(value);

  const activator = (
    <Button
      disclosure="select"
      onClick={togglePopoverActive}
      fullWidth
      textAlign="left"
      icon={ClockMinor}
      disabled={disabled}
      destructive={error}
      id="selectButton"
    >
      {parsedValue}
    </Button>
  );

  return (
    <Popover active={active} activator={activator} onClose={togglePopoverActive} fullWidth>
      <ScrollableList onChange={onChange} options={times} selected={value} isOpen={active} />
    </Popover>
  );
};
