import React from 'react';
import { TextFieldProps } from '@shopify/polaris/dist/types/latest/src/components/TextField/TextField';
import { TextField } from '@shopify/polaris';
import styles from './textFieldWithCounter.module.scss';

type TextFieldWithCounterProps = TextFieldProps & { limit: number; charactersCount: number };
const TextFieldWithCounter = (props: TextFieldWithCounterProps) => {
  const { label, charactersCount, limit } = props;
  const updatedProps = { ...props, label: '' };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.label}>{label}</div>
        <div className={styles.counter}>{`${charactersCount}/${limit}`}</div>
      </div>
      <TextField {...updatedProps} />
    </div>
  );
};

export default TextFieldWithCounter;
