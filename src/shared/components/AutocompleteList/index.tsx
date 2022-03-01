import { Icon, OptionList, Popover, TextField, TextStyle } from '@shopify/polaris';
import { SelectMinor } from '@shopify/polaris-icons';
import React, { useState, useEffect } from 'react';
import { AutocompleteOptions } from '../../store/meta/types/AutocompleteOptions';

type OnSelectFunc = (value: number, id: string) => void;

type Props = {
  label: string;
  placeholder: string;
  fieldId: string;
  options: AutocompleteOptions;
  selected?: number | null;
  disabled?: boolean;
  error?: string | boolean;
  onSelect: OnSelectFunc;

  /* allow to use custom value instead of options */
  text?: string | null;
  /* if you need to get current input value */
  onTextChange?: (arg: string) => void;
};

export const AutocompleteList: React.FC<Props> = ({
  label,
  placeholder,
  fieldId,
  options,
  selected,
  disabled,
  error,
  onSelect,
  text,
  onTextChange,
}: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOption, setFilteredOptions] = useState<typeof options>([]);
  const [popoverActive, setPopoverActive] = useState(false);

  const getSelectedValue = (id: number) =>
    options.find((o) => o.value === id.toString())?.label || text;

  const openPopover = () => setPopoverActive(true);
  const closePopover = () => setPopoverActive(false);

  const handleChange = (selectedOptions: string[]) => {
    onSelect(+selectedOptions[0], fieldId);
    closePopover();
  };

  const filterOptions = (value: string) => {
    const filtered = options.filter((o) => o.label.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
  };

  const setDefaultInputValue = (selected: number) => {
    const value = getSelectedValue(selected);
    if (value) setInputValue(value);
  };

  const matchInput = () => options.some((o) => o.label.includes(inputValue));

  const handlePopoverClose = () => {
    if (inputValue === '' && selected) {
      setDefaultInputValue(selected);
      closePopover();
    } else if (inputValue && !matchInput()) {
      closePopover();
    } else {
      closePopover();
    }
  };

  const handleInputFocus = () => {
    filterOptions(inputValue || '');
    openPopover();
  };

  const handleInputValue = (value: string) => {
    setInputValue(value);

    if (onTextChange) {
      onTextChange(value);
    }

    if (!popoverActive) {
      filterOptions('');
      setPopoverActive(true);
    }
  };

  useEffect(() => {
    if (selected) {
      setDefaultInputValue(selected);
    }
  }, [selected, options]);

  useEffect(() => {
    filterOptions(inputValue);
  }, [inputValue]);

  const activator = (
    <TextField
      label={label}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleInputValue}
      onFocus={handleInputFocus}
      suffix={<Icon source={SelectMinor} />}
      autoComplete={false}
      disabled={disabled}
      error={error}
    />
  );

  const getFilteredOptions = () =>
    filteredOption.length > 0 ? (
      <OptionList
        onChange={handleChange}
        options={filteredOption}
        selected={[selected?.toString() || '']}
      />
    ) : (
      <Popover.Section>
        <TextStyle variation="subdued">Not found</TextStyle>
      </Popover.Section>
    );

  return (
    <div>
      <Popover
        activator={activator}
        active={popoverActive}
        preferInputActivator={false}
        fullWidth
        onClose={handlePopoverClose}
      >
        {options.length > 0 ? (
          getFilteredOptions()
        ) : (
          <Popover.Section>No options for select</Popover.Section>
        )}
      </Popover>
    </div>
  );
};
