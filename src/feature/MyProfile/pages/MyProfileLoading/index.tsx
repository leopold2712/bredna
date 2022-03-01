import React from 'react';
import { Card, Layout, SkeletonBodyText, SkeletonPage } from '@shopify/polaris';

export default function MyProfileLoading(): JSX.Element {
  return (
    <SkeletonPage title="My Profile">
      <Layout>
        <Layout.Section>
          <Card title="Professional ID">
            <Card.Section>
              <SkeletonBodyText lines={15} />
            </Card.Section>
          </Card>
          <Card>
            <Card.Header title="Intro video" />
            <Card.Section>
              <SkeletonBodyText lines={15} />
            </Card.Section>
          </Card>
          <Card>
            <Card.Header title="Education" />
            <Card.Section>
              <SkeletonBodyText lines={5} />
            </Card.Section>
          </Card>
          <Card title="Skills">
            <Card.Section>
              <SkeletonBodyText lines={5} />
            </Card.Section>
          </Card>
          <Card>
            <Card.Header title="Certificate" />
            <Card.Section>
              <SkeletonBodyText lines={5} />
            </Card.Section>
          </Card>
          <Card title="Therapy languages">
            <Card.Section>
              <Card.Section>
                <SkeletonBodyText lines={5} />
              </Card.Section>
            </Card.Section>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="General profile">
            <Card.Section>
              <SkeletonBodyText lines={40} />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
