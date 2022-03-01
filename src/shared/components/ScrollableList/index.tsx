import moment from 'moment';
import React, { useEffect } from 'react';
import { ScrollableItem } from './components/ScrollableItem';

import styles from './styles.module.scss';

type Props = {
  onChange: (date: Date) => void;
  options: { label: string; value: string }[];
  selected: Date;
  isOpen: boolean;
};

export const ScrollableList: React.FC<Props> = ({
  onChange,
  options,
  selected,
  isOpen,
}: Props): JSX.Element => {
  const refs: { [key: string]: React.Ref<HTMLLIElement> } = {};

  useEffect(() => {
    const key = moment(selected).format('LLLL');
    const currentLiElementRef = refs[key];
    if (isOpen && currentLiElementRef) {
      // @ts-ignore
      currentLiElementRef.current.scrollIntoView();
    }
  }, [isOpen]);

  return (
    <ul className={styles.scrollable_ul}>
      {options.map((o) => {
        const ref = React.createRef<HTMLLIElement>();
        const key = moment(o.value).format('LLLL');
        refs[key] = ref;
        return (
          <ScrollableItem label={o.label} value={o.value} onChange={onChange} ref={ref} key={key} />
        );
      })}
    </ul>
  );
};
