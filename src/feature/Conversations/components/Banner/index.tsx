import { Banner } from '@shopify/polaris';
import React from 'react';

import './banner.overload.scss';

export const ChatBanner = (): JSX.Element => (
  <div className="banner-overload__wrapper">
    <Banner>
      <p>Messages are end to end encrypted.</p>
      <p>No one outside of this chat can read them.</p>
    </Banner>
  </div>
);
