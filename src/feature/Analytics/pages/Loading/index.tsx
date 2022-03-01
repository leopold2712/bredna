import { Card, Layout, SkeletonBodyText, SkeletonPage } from '@shopify/polaris';
import React from 'react';

export const AnalyticsLoading: React.FC = () => {
  return (
    <SkeletonPage fullWidth title="Analytics" secondaryActions={1}>
      <Layout>
        <Layout.Section oneHalf>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};
