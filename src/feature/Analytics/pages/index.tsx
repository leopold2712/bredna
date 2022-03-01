import React, { useEffect, useState } from 'react';
import { Page, Layout, FooterHelp, Link, Icon } from '@shopify/polaris';
import moment from 'moment';
import { ExportMinor } from '@shopify/polaris-icons';
import { useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { useLocation } from 'react-router-dom';
import TotalOrdersChart from '../components/TotalOrdersChart';
import TotalCustomersChart from '../components/TotalCustomersChart';
import { AnalyticsTaxTable } from '../components/Tables/AnalyticsTaxTable';
import { useAppDispatch } from '../../../main/store';
import { getAnalyticsTableAsync } from '../store/actions/getAnalyticsTableAsync';
import { RootState } from '../../../main/store/rootReducer';
import { RevShareTable } from '../components/Tables/RevShareTable';
import Analytics from './Initial';
import { AnalyticsLoadingState } from '../components/LoadingState';
import { getOrdersAsync } from '../store/actions/getOrdersAsync';
import { getCustomersAsync } from '../store/actions/getCustomersAsync';
import { clearAnalyticsOrders } from '../store';
import MonthSwitch from '../components/MonthSwitch';
import { useAppSelector } from '../../../main/store/hooks';
import { setMenuItemSection } from '../../../shared/components/SideMenu';
import {
  MenuActiveSection,
  MenuPages,
} from '../../../shared/components/SideMenu/models/SideMenuState';

const AnalyticsCharts: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = new URLSearchParams(useLocation().search);
  const section = query.get('section');
  if (section) {
    const element = document.getElementById(section);
    let block: ScrollLogicalPosition = 'center';
    if (section === 'reports') block = 'start';
    element?.scrollIntoView({ behavior: 'smooth', block });
  }

  const initialMoment = moment();
  const [from, setFrom] = useState(`${initialMoment.year()}-${initialMoment.month() + 1}-01`);
  const [to, setTo] = useState(
    `${initialMoment.year()}-${initialMoment.month() + 1}-${initialMoment.endOf('month').date()}`,
  );
  const [currentDate, setCurrentDate] = useState(moment());
  const { table, initialAnalyticsLoaded } = useSelector((state: RootState) => state.analytics);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);
  const [csvData, setCsvData] = useState('');

  // @ts-ignore
  const { total_orders, total_clients } = useAppSelector((state) => state.dashboard);

  const getAnalyticsAsync = async () => {
    setAnalyticsLoading(true);
    const start_date = moment.utc(from).unix();
    const end_date = moment.utc(to).unix();
    await dispatch(getOrdersAsync({ start_date, end_date }));
    await dispatch(getCustomersAsync({ start_date, end_date }));
    await dispatch(getAnalyticsTableAsync({ start_date, end_date }));
    setAnalyticsLoading(false);
  };

  useEffect(() => {
    getAnalyticsAsync();
  }, [from, to]);

  const name = `${moment(from, 'YYYY-MM-DD').format('DD MMM YYYY')} - ${moment(
    to,
    'YYYY-MM-DD',
  ).format('DD MMM YYYY')}`;

  const setNewDates = ({ start, end }: { start: Date; end: Date }) => {
    setFrom(moment(start).format('YYYY-MM-DD'));
    setTo(moment(end).format('YYYY-MM-DD'));
  };

  const expertName = `${user?.first_name} ${user?.last_name}`;
  useEffect(() => {
    const csv = [
      'taxName,address,name,grossPayment,processingFee,netPaymentBeforeIrs,id,irs_pay,irs_type,',
    ];
    csv.push(
      `${expertName},,${expertName},$${table ? table.grossPayment.USD.toFixed(2) : '0.00'},${
        table ? table.processingFee.fee.toString() : '0'
      },$${table ? table.netPaymentBeforeIrs.USD.toFixed(2) : '0.00'},${
        user?.id ? user?.id.toString() : ''
      },$${table ? table.irs.pay.USD.toFixed(2) : '0.00'},${table ? table.irs.type : ''}`,
    );
    csv.push(',,,,,,,,,,', ',,,,,,,,,,', ',,,,,,,,,,');
    csv.push(
      'Plan Name,Role,RevShare %,Plan Type,Payment Method,User Name,Source Name,Purchase Date,Total Purchase,Your Share $',
    );
    csv.push(',,,,,,,,,,');
    csv.push(
      'planName,role,revInPrecent,planType,paidWithName,userName,sourceName,purchasedAt,amount,expertRev',
    );
    table?.details.forEach((d) => {
      const line = [
        `${d.planName} ${d.eventDate ? moment(d.eventDate).format('YYYY-MM-DD hh:mm') : ''}`,
        d.role.split(',').join(''),
        `${d.revInPrecent * 100}%`,
        d.planType,
        d.paidWithName,
        d.userName,
        d.sourceName,
        d.purchasedAt,
        `${d.amount.toFixed(2)}${d.currencySymbol}`,
        `${d.expertRev.toFixed(2)}${d.currencySymbol}`,
      ];
      csv.push(line.join(','));
    });
    setCsvData(csv.join('\n'));
  }, [table]);

  const getInitialSummary = async () => {
    setAnalyticsLoading(true);
    // await dispatch(getSummaryAsync());
    setAnalyticsLoading(false);
  };

  useEffect(() => {
    getInitialSummary();
    return () => {
      dispatch(clearAnalyticsOrders());
    };
  }, []);

  useEffect(() => {
    if (section) {
      dispatch(setMenuItemSection(MenuPages.Analytics, section as MenuActiveSection));
    }
  }, [section]);

  if (analyticsLoading && !initialAnalyticsLoaded) {
    return <AnalyticsLoadingState />;
  }

  if (total_orders === 0 && total_clients === 0) {
    return <Analytics />;
  }

  return (
    <>
      <div id="dashboards" />
      <Page title="Analytics" fullWidth>
        <div className="analytics__header single-item-page">
          <MonthSwitch
            setNewDates={setNewDates}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
        <Layout>
          <Layout.Section oneThird>
            <TotalOrdersChart name={name} from={from} to={to} />
          </Layout.Section>
          <Layout.Section oneThird>
            <TotalCustomersChart name={name} from={from} to={to} />
          </Layout.Section>
          <Layout.Section oneThird />
        </Layout>
        <div id="reports" />
        <Layout>
          <Layout.Section>
            <div className="export-button__wrapper">
              <CSVLink
                data={csvData}
                filename={`${expertName}_${name.replaceAll(' ', '')}_${moment().format(
                  'DD.MM.YYYYTh-mma',
                )}.csv`}
                className="export-button__link"
              >
                <Icon source={ExportMinor} color="base" />
                <p>Export RevShare</p>
              </CSVLink>
            </div>
          </Layout.Section>
          <Layout.Section>
            <AnalyticsTaxTable data={table} expertName={expertName} expertId={user?.id} />
          </Layout.Section>
          <Layout.Section>
            <RevShareTable data={table} />
          </Layout.Section>
        </Layout>
        <div className="no-print">
          <FooterHelp>
            {'Learn more about '}
            <Link url="https://support.hey-expert.com/en/">Analytics</Link>
          </FooterHelp>
        </div>
      </Page>
    </>
  );
};

export default AnalyticsCharts;
