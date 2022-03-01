import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  image: string;
  children: ReactNode;
};

export const FormTemplate = ({ image, children }: Props): JSX.Element => (
  <>
    <div className={styles.formWrapper}>
      <div className={styles.form}>{children}</div>
    </div>

    <div
      className={styles.imageDecoration}
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
  </>
);
