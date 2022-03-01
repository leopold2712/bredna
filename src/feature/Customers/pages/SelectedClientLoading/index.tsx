import React from 'react';
import { Card, Layout, SkeletonBodyText, TextContainer, SkeletonPage } from '@shopify/polaris';

const SelectedClientLoading: React.FC = () => (
  <div className="selected-client-page">
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <Card title="Client journey">
            <Card.Section>
              <TextContainer>
                <SkeletonBodyText lines={4} />
                <SkeletonBodyText lines={4} />
                <SkeletonBodyText lines={4} />
                <SkeletonBodyText lines={4} />
                <SkeletonBodyText lines={4} />
                <SkeletonBodyText lines={4} />
              </TextContainer>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  </div>
);

export default SelectedClientLoading;
