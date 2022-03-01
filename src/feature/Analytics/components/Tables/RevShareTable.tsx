import React from 'react';
import { Card, DataTable } from '@shopify/polaris';
import moment from 'moment';
import { AnalyticsTableDTO } from '../../dtos/analyticsTable.dto';
import { useAppSelector } from '../../../../main/store/hooks';
import AnalyticsLoader from '../LoadingOverlay';

export const RevShareTable: React.FC<{
  data?: AnalyticsTableDTO;
}> = ({ data }: { data?: AnalyticsTableDTO }) => {
  const { analyticsLoading } = useAppSelector((state) => state.analytics);
  const mappedData = data
    ? data.details.map((d) => {
        return [
          `${d.planName} ${d.eventDate ? moment(d.eventDate).format('YYYY-MM-DD hh:mm') : ''}`,
          d.role,
          `${d.revInPrecent * 100}%`,
          d.planType,
          d.paidWithName,
          d.userName,
          d.sourceName,
          d.purchasedAt,
          `${d.amount.toFixed(2)}${d.currencySymbol}`,
          `${d.expertRev.toFixed(2)}${d.currencySymbol}`,
        ];
      })
    : [];
  return (
    <Card>
      <div className="analytics__item-with-loading">
        <DataTable
          headings={[
            'Plan Name',
            'Role',
            'Your Share %',
            'Plan Type',
            'Payment Method',
            'User Name',
            'Source Name',
            'Purchase Date',
            'Total Purchase',
            'Your Share $',
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
            'text',
          ]}
          rows={mappedData}
          hideScrollIndicator
        />
        {analyticsLoading && <AnalyticsLoader />}
      </div>
    </Card>
  );
};
