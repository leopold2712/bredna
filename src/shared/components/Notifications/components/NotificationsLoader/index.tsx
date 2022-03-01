import { Stack, Spinner } from '@shopify/polaris';
import React from 'react';
import { useAppSelector } from '../../../../../main/store/hooks';
import { getIsLoading } from '../../store';

export const NotificationsLoader = (): JSX.Element => {
  const isLoading = useAppSelector(getIsLoading);
  return isLoading ? (
    <Stack alignment="center" distribution="center">
      <Spinner size="small" />
    </Stack>
  ) : (
    <></>
  );
};
