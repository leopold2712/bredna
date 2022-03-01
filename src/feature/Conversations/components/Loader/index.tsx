import { Spinner } from '@shopify/polaris';
import React from 'react';

export const MessageLoader = () => (
  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <Spinner />
  </div>
);
