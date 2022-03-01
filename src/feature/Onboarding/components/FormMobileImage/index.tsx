import React from 'react';

import styles from './styles.module.scss';

type Props = {
  src: string;
};

export const FormMobileImage = ({ src }: Props): JSX.Element => (
  <div className={styles.mobileDecorationImage}>
    <div className={styles.image} style={{ backgroundImage: `url(${src})` }} />
  </div>
);
