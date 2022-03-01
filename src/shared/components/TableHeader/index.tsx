import React, { FC } from 'react';
import classNames from 'classnames';

import type { IResourceListFields } from '../../../main/interfaces';

import styles from './styles.module.scss';

type TProps = {
  fields: IResourceListFields[];
  isSession?: boolean;
};

export const TableHeader: FC<TProps> = ({ fields, isSession }: TProps): JSX.Element => {
  const tableHeaderClassNames = classNames(styles.table_header, { [styles.session]: isSession });

  return (
    <div className={tableHeaderClassNames}>
      {fields.map((item) => (
        <div
          className={classNames(styles.table_header__name, {
            [styles.centered]: item.centered,
          })}
          style={{
            flex: `${item.width} 1`,
          }}
          key={`table-header__${item.key}`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
