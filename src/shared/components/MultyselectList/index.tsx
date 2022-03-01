import React, { useState, useEffect } from 'react';
import { Card, Checkbox, Icon, Popover, Stack, Tag, TextField } from '@shopify/polaris';
import { SelectMinor } from '@shopify/polaris-icons';
import { SimpleType } from '../../dtos/simple.dto';
import styles from './skills.module.scss';

type Props = {
  items: SimpleType[];
  selected: SimpleType[];
  onItemRemove: (item: SimpleType) => void;
  addManyItems: (
    itemsForUpdate: {
      item: SimpleType;
      checked: boolean;
    }[],
  ) => void;
  placeholder: string;
  suffix?: boolean;
  disabled?: boolean;
};

export const MultySelectPopover: React.FC<Props> = ({
  items,
  selected,
  onItemRemove,
  addManyItems,
  placeholder,
  suffix = false,
  disabled = false,
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [popoverActive, setPopoverActive] = useState(false);
  const [selectedList, setSelectedList] = useState<SimpleType[]>([]);
  const [itemsForAdding, setItemsForAdding] = useState<{ item: SimpleType; checked: boolean }[]>(
    [],
  );

  const popoverActivator = (
    <TextField
      label=""
      value={searchValue}
      onChange={setSearchValue}
      placeholder={placeholder}
      onFocus={() => setPopoverActive(true)}
      autoComplete={false}
      suffix={suffix && <Icon source={SelectMinor} />}
      disabled={disabled}
    />
  );

  const handleAddItem = (item: SimpleType) => (checked: boolean) => {
    setSearchValue('');

    const target = itemsForAdding.find((i) => i.item.id === item.id);
    if (target) {
      setItemsForAdding((prev) =>
        prev.map((i) => {
          if (i.item.id === target.item.id) {
            return { item: i.item, checked };
          }
          return i;
        }),
      );
    } else {
      setItemsForAdding((prev) => [...prev, { item, checked }]);
    }

    if (checked) {
      setSelectedList((prev) => [...prev, item]);
    } else {
      setSelectedList((prev) => prev.filter((s) => s.id !== item.id));
    }
  };

  const handleItemRemove = (item: SimpleType) => () => {
    onItemRemove(item);
  };

  useEffect(() => {
    if (popoverActive) {
      setSelectedList(selected);
    }
  }, [popoverActive]);

  useEffect(() => {
    if (itemsForAdding.length) {
      setItemsForAdding([]);
      addManyItems(itemsForAdding);
    }
  }, [itemsForAdding]);

  useEffect(() => {
    setSelectedList(selected);
  }, [selected]);

  const getElementsForRender = (): SimpleType[] => {
    const selectedFiltered = selected.filter((s) => {
      const target = itemsForAdding.find((i) => i.item.id === s.id);
      if (target && !target.checked) return false;
      return true;
    });

    const newSelected = [...itemsForAdding.filter((i) => i.checked)].map((i) => ({
      id: i.item.id,
      name: i.item.name,
    }));

    if (popoverActive) {
      return [...selectedFiltered, ...newSelected];
    }
    return selected;
  };

  const renderItems = getElementsForRender();

  const resultItems = [...items];

  if (searchValue) resultItems.push({ id: +new Date(), name: searchValue });

  return (
    <>
      <Popover
        active={popoverActive}
        activator={popoverActivator}
        onClose={() => setPopoverActive(false)}
        fullWidth
        preferInputActivator={false}
      >
        <Card>
          <Card.Section>
            <div className={styles.skillsPopoverContainer}>
              {resultItems
                .filter((item) => {
                  if (searchValue === '') {
                    return true;
                  }
                  return item.name.toLowerCase().includes(searchValue.toLowerCase());
                })
                .map((item) => (
                  <div key={item.id}>
                    <Checkbox
                      checked={
                        selectedList.filter((selectedSkill) => selectedSkill.name === item.name)
                          .length > 0
                      }
                      onChange={handleAddItem(item)}
                      label={item.name}
                    />
                  </div>
                ))}
            </div>
          </Card.Section>
        </Card>
      </Popover>
      {(selected.length > 0 || itemsForAdding.length > 0) && (
        <div className={styles.selectedSkillsContainer}>
          <Stack>
            {renderItems.map((item) => (
              <Tag key={item.id} onRemove={handleItemRemove(item)}>
                {item.name}
              </Tag>
            ))}
          </Stack>
        </div>
      )}
    </>
  );
};
