import { Card, DataTable } from '@shopify/polaris';
import React from 'react';
import { useAppSelector } from '../../../../main/store/hooks';
import { AnalyticsTableDTO } from '../../dtos/analyticsTable.dto';
import AnalyticsLoader from '../LoadingOverlay';

export const AnalyticsTaxTable: React.FC<{
  data?: AnalyticsTableDTO;
  expertName?: string;
  expertId?: number;
}> = ({
  data,
  expertName,
  expertId,
}: {
  data?: AnalyticsTableDTO;
  expertName?: string;
  expertId?: number;
}) => {
  const { analyticsLoading } = useAppSelector((state) => state.analytics);
  return (
    <Card>
      <div className="analytics__item-with-loading">
        <DataTable
          headings={[
            'Tax Name',
            'Address',
            'Name',
            'Gross Payment',
            'Processing Fee',
            'Net Payment Before IRS',
            'ID',
            'IRS Pay',
            'IRS Type',
          ]}
          columnContentTypes={[
            'text',
            'text',
            'text',
            'text',
            'text',
            'text',
            'text',
            'text',
            'text',
          ]}
          rows={[
            [
              expertName,
              'TBD',
              expertName,
              `$${data ? data.grossPayment.USD.toFixed(2) : '0.00'}`,
              data ? data.processingFee.fee.toString() : '0',
              `$${data ? data.netPaymentBeforeIrs.USD.toFixed(2) : '0.00'}`,
              expertId ? expertId.toString() : '',
              `$${data ? data.irs.pay.USD.toFixed(2) : '0.00'}`,
              data ? data.irs.type : '',
            ],
          ]}
          hideScrollIndicator
        />
        {analyticsLoading && <AnalyticsLoader />}
      </div>
    </Card>
  );
};
