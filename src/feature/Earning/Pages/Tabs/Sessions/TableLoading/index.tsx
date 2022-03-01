import React, { FC } from 'react';
import { Card, Layout, ResourceItem, ResourceList, SkeletonBodyText } from '@shopify/polaris';
import { Loader } from '../../../../../../shared/components/Loader';

export const TableLoading: FC = () => {
  const resourceName = {
    singular: 'session',
    plural: 'sessions',
  };

  const renderItem = () => (
    <ResourceItem id={new Date().toString()} onClick={() => null}>
      <SkeletonBodyText />
    </ResourceItem>
  );

  return (
    <>
      <Loader />
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <ResourceList
                resourceName={resourceName}
                items={[{}, {}, {}]}
                renderItem={renderItem}
              />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </>
  );
};
