import { Stack, Caption } from '@shopify/polaris';
import React from 'react';

export const ListEndMessage = (): JSX.Element => (
  <Stack alignment="center" distribution="center">
    <Caption>
      You
      <span>&apos;</span>
      ve downloaded all notifications
    </Caption>
  </Stack>
);
