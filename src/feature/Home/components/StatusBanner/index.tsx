import { Banner } from '@shopify/polaris';
import React from 'react';
import { TherapistProfileStatuses } from '../../../../shared/constants';
import './styles.overload.scss';

type Props = {
  status: TherapistProfileStatuses;
  onDismiss: () => void;
};

export const StatusBanner = ({ status, onDismiss }: Props): JSX.Element => {
  const title =
    status === TherapistProfileStatuses.ACTIVE
      ? 'Your profile is now live for clients.'
      : 'Please note!';

  return (
    <div className="status-banner__wrapper">
      <Banner
        title={title}
        status="info"
        onDismiss={status === TherapistProfileStatuses.ACTIVE ? onDismiss : undefined}
      >
        {status !== TherapistProfileStatuses.ACTIVE && (
          <p className="status-banner__inactive-info">
            Our customer support team will go through your profile to make sure everything is in
            place before going live, and they will contact you shortly.
          </p>
        )}

        <p>
          For any further questions contact{' '}
          <a href="mailto:support@brenda.app">Support@brenda.app</a>
        </p>
      </Banner>
    </div>
  );
};
