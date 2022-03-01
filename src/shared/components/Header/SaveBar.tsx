import { Button, Image, Loading } from '@shopify/polaris';
import React from 'react';
import Logo from '../../../assets/images/work-space-logo.svg';
import './style.scss';

type Props = {
  className?: string;
  onDiscard?: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export const SaveBar = ({
  className = 'fixed-bar',
  onConfirm,
  onDiscard,
  isLoading = false,
  disabled,
}: Props): JSX.Element => (
  <div className={`app__header ${className}`} style={{ padding: '10px 10px 10px 0' }}>
    <div className={`logo__wrapper logo__wrapper_${className}`}>
      <Image source={Logo} alt="Logo" />
    </div>
    <p className="app__header-txt">Unsaved Changes</p>
    <div className="buttons-group">
      {onDiscard && !isLoading && (
        <button
          type="button"
          className="button__tranparent"
          onClick={onDiscard}
          disabled={disabled}
        >
          Discard
        </button>
      )}
      <div style={{ marginLeft: '10px' }}>
        <Button primary onClick={onConfirm} loading={isLoading} disabled={disabled}>
          Save
        </Button>
      </div>
    </div>
    {isLoading && <Loading />}
  </div>
);
