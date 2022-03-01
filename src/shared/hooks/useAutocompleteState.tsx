import { useCallback, useEffect, useState } from 'react';

export type ISelectItem = {
  value: string;
  label: string;
};

const useAutocompleteState = (
  id: string,
  list: ISelectItem[],
  changeCallback: (e: { target: { id: string; value: string[] | number[] } }) => void,
  currentList: string[],
  initialValue?: string,
): [
  string,
  ISelectItem[],
  (value: string, id: string) => void,
  (selected: string[]) => void,
  (tag: string) => () => void,
] => {
  const [inputValue, setInputLanguageValue] = useState(initialValue || '');
  const [options, setLanguageOptions] = useState<ISelectItem[]>(list);

  useEffect(() => {
    if (initialValue) {
      setInputLanguageValue(initialValue);
      setLanguageOptions(list.filter((option) => option.label.includes(initialValue)));
    } else {
      setLanguageOptions(list);
    }
  }, [list, initialValue]);

  const updateText = useCallback(
    (value) => {
      setInputLanguageValue(value);

      if (value === '') {
        setLanguageOptions(list);
      } else {
        const resultOptions = list.filter((option) => option.label.includes(value));
        setLanguageOptions(resultOptions);
      }
    },
    [list],
  );

  const updateSelection = useCallback(
    (selected) => {
      changeCallback({ target: { id, value: selected.map((option: string) => Number(option)) } });
    },
    [id, changeCallback],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const newList: string[] = [...currentList];
      newList.splice(newList.indexOf(tag), 1);
      changeCallback({ target: { id, value: newList } });
    },
    [id, changeCallback, currentList],
  );
  return [inputValue, options, updateText, updateSelection, removeTag];
};

export default useAutocompleteState;
