import React from 'react';
import { SearchMajor } from '@shopify/polaris-icons';
import {
  Card,
  Icon,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  SkeletonBodyText,
  SkeletonThumbnail,
  TextField,
} from '@shopify/polaris';
import { Loader } from '../../../../shared/components/Loader';

const CustomersLoading: React.FC = () => {
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const renderItem = () => (
    <ResourceItem id={new Date().toString()} media={<SkeletonThumbnail />} onClick={() => null}>
      <SkeletonBodyText />
    </ResourceItem>
  );

  return (
    <Page title="Clients" fullWidth>
      <Loader />
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <TextField
                label="Search customer"
                value=""
                onChange={() => null}
                labelHidden
                prefix={<Icon source={SearchMajor} />}
                placeholder="Search for a customer"
              />
              <ResourceList
                resourceName={resourceName}
                items={[{}, {}, {}, {}, {}]}
                renderItem={renderItem}
              />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default CustomersLoading;
