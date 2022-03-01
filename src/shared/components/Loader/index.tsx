import { Spinner } from '@shopify/polaris';
import React from 'react';
import './loader.scss';

export const Loader: React.FC = () => (
  <div className="loader__wrapper">
    <div className="loader__spinner">
      <Spinner />
    </div>
  </div>
);
