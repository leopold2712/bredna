import React, { useState } from 'react';
import { Popover, Button } from '@shopify/polaris';
import { ClockMinor } from '@shopify/polaris-icons';

import styles from './styles.module.scss';

type Props = {
  value: string;
  options: string[];
  selected: string[];
  disabled: boolean;
  onChange: (item: string) => void;
};
export const HoursPopover = ({
  value,
  options,
  selected,
  disabled,
  onChange,
}: Props): JSX.Element => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => setPopoverActive((prev) => !prev);

  const activator = (
    <Button
      disclosure="select"
      onClick={togglePopoverActive}
      fullWidth
      textAlign="left"
      icon={ClockMinor}
      disabled={disabled}
    >
      {value}
    </Button>
  );

  return (
    <Popover active={popoverActive} activator={activator} onClose={togglePopoverActive} fullWidth>
      <div className={styles.wrapper}>
        {options.map((hour) => (
          <button
            key={hour}
            type="button"
            className={selected.includes(hour) ? styles['button--selected'] : ''}
            onClick={() => onChange(hour)}
          >
            {hour}
          </button>
        ))}
      </div>
    </Popover>
  );
};
