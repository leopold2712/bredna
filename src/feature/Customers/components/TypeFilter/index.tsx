import React from 'react';
import styles from './styles.module.scss';

type Props = {
  items: { id: number; content: string; onAction: (arg: string) => void }[];
  selected?: number[];
};
export const TypeFilter: React.FC<Props> = ({ items, selected }: Props): JSX.Element => (
  <div className={styles.typeFilter}>
    {items.map((item) => (
      <button
        type="button"
        onClick={() => item.onAction(item.content)}
        key={item.id.toString()}
        className={`${selected?.includes(item.id) ? styles.selected : ''}`}
      >
        {item.content}
      </button>
    ))}
  </div>
);
