import { Spinner } from '@shopify/polaris';
import React from 'react';

export const ChatDialogLoader = () => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <Spinner />
  </div>
);
