import { Spinner } from '@shopify/polaris';
import React from 'react';

const AnalyticsLoader = () => (
  <div className="analytics__loader">
    <Spinner accessibilityLabel="Spinner example" size="large" />
  </div>
);
export default AnalyticsLoader;
