import { Button, OptionList, Popover } from '@shopify/polaris';
import { OptionDescriptor } from '@shopify/polaris/dist/types/latest/src/components/OptionList';
import classNames from 'classnames';
import React, { useState } from 'react';

import './styles.overload.scss';

type Props = {
  // @formik field id or field name for cb
  id: string;

  // @select options
  options: OptionDescriptor[];

  // @cb on select
  onChange: (arg: string, id?: string | number) => void;

  // @selected value
  value?: string;

  // @disabled
  disabled?: boolean;

  // @placeholder
  placeholder?: string;

  // @label at the top of the button
  label?: string;

  // @label inside the select
  inlineLabel?: boolean;

  // @use labels from options instead of selected value
  useExternalLabels?: boolean;
};

export const BeautySelect: React.FC<Props> = ({
  id,
  options,
  onChange,
  value,
  disabled = false,
  placeholder,
  label,
  inlineLabel = false,
  useExternalLabels,
}: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (selected: string[]) => {
    onChange(selected[0], id);
    toggleOpen();
  };

  const activatorClassNames = classNames({
    'listActivator--overload': label ? label.length > 0 : false,
  });

  const optionLabel = String(options.find((o) => o.value === value)?.label) || '';

  const getButtonText = (): string => {
    if (useExternalLabels) return `${inlineLabel ? `${label} ` : ''}${optionLabel}`;
    return `${inlineLabel ? `${label} ` : ''}${value || placeholder || ''}`;
  };

  const activator = (
    <div className={activatorClassNames}>
      {label && !inlineLabel && <p className={`${activatorClassNames}-label`}>{label}</p>}
      <Button
        disclosure="select"
        onClick={toggleOpen}
        fullWidth
        textAlign="left"
        disabled={disabled}
      >
        {getButtonText()}
      </Button>
    </div>
  );

  return (
    <Popover
      activator={activator}
      active={open}
      onClose={toggleOpen}
      preferInputActivator
      fullWidth
    >
      <OptionList options={options} selected={[value || '']} onChange={handleSelect} />
    </Popover>
  );
};
