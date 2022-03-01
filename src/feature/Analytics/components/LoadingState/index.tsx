import { SkeletonPage, Layout, Card, SkeletonBodyText } from '@shopify/polaris';
import React from 'react';

export const AnalyticsLoadingState = () => (
  <SkeletonPage title="Analytics" primaryAction secondaryActions={2}>
    <Layout>
      <Layout.Section oneThird>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <Card sectioned>
          <SkeletonBodyText />
        </Card>
      </Layout.Section>
    </Layout>
  </SkeletonPage>
);
