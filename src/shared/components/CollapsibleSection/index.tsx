import React, { ReactNode, useState } from 'react';
import { Collapsible } from '@shopify/polaris';
import { v4 as uuid } from 'uuid';
import { CollapseButton } from '../CollapseButton';

import styles from './styles.module.scss';

type Props = {
  label: string;
  children: ReactNode;
};

export const CollapsibleSection = ({ label, children }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <div className={styles.button}>
        <CollapseButton label={label} isOpen={open} onClick={toggleOpen} />
      </div>
      <Collapsible
        id={uuid()}
        open={open}
        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
        expandOnPrint
      >
        {children}
      </Collapsible>
    </div>
  );
};
