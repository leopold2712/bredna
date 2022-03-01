import React, { useState } from 'react';
import { Popover, ActionList, Button } from '@shopify/polaris';
import { RepeatOptions } from '../../constants';

type Props = {
  onSelect: (option: RepeatOptions) => void;
  suffix: string;
  selected: RepeatOptions;
  disabled: boolean;
};

export const RepeatPopover = ({ onSelect, suffix, selected, disabled }: Props): JSX.Element => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => setPopoverActive((prev) => !prev);

  const handleActionClick = (value: RepeatOptions) => {
    onSelect(value);
    togglePopoverActive();
  };

  const activator = (
    <Button
      disclosure="select"
      onClick={togglePopoverActive}
      fullWidth
      textAlign="left"
      disabled={disabled}
    >
      {selected}
    </Button>
  );
  return (
    <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive} fullWidth>
      <ActionList
        items={[
          {
            content: 'Does not repeat',
            onAction: () => handleActionClick(RepeatOptions.DOESNT_REPEAT),
          },
          { content: 'Daily', onAction: () => handleActionClick(RepeatOptions.DAILY) },
          {
            content: `Weekly on ${suffix}`,
            onAction: () => handleActionClick(RepeatOptions.WEEKLY),
          },
          {
            content: `Monthly`,
            onAction: () => handleActionClick(RepeatOptions.MONTHLY),
          },
          { content: 'Custom...', onAction: () => handleActionClick(RepeatOptions.CUSTOM) },
        ]}
      />
    </Popover>
  );
};
