import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { DataTable, SortDirection } from '@shopify/polaris';

import EmptySearch from '../../../../../shared/components/EmptySearch';
import CSVButtonCustomize from '../../../../../shared/components/CSVButtonCustomize';
import ListPagination from '../../../../../shared/components/Pagination';
import { MonthSwitch } from '../../../../../shared/components/MonthSwitch';
import { SessionsTable } from '../../../components/SessionsTable';
import { TableHeader } from '../../../../../shared/components/TableHeader';
import { fields, sessionDetailsTableConfig } from '../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../../main/store/hooks';
import { getRevShareAsync } from '../../../store/actions/getRevShareAsync';
import { Loading } from './Loading';
import { getSessions } from '../../../../../shared/store/actions/getSessions';
import { MobileSessionTable } from '../../../components/MobileSessionTable';
import { getNestedFields } from '../../../../../shared/utils';
import { useCustomWindowWidth } from '../../../../../shared/hooks/useCustomWindowWidth';

import type { SessionDTO } from '../../../../../shared/dtos/session.dto';

import styles from './styles.module.scss';
import './styles.overload.scss';

export const Sessions: FC = () => {
  const dispatch = useAppDispatch();
  const { mobileView } = useCustomWindowWidth();

  const { total, isLoaded } = useAppSelector((state) => state.earning);
  const { list: session_details, pagination, loading } = useAppSelector(
    (state) => state.customers.sessions,
  );

  const [currentDate, setCurrentDate] = useState(moment());
  const [startTime, setStartTime] = useState(moment().startOf('M').unix());
  const [endTime, setEndTime] = useState(moment().unix());
  const [mappedData, setMappedData] = useState<string[][]>([]);

  const sessionDetailsClassNames = classNames(
    styles.tables__session_details,
    'tables__session-details',
  );

  const getFilteredSessions = (page = 1, sortBy?: string, sortDirection?: string) => {
    dispatch(getSessions({ startTime, endTime, page, sortBy, sortDirection }));
  };

  useEffect(() => {
    dispatch(getRevShareAsync({ startTime, endTime }));
    getFilteredSessions();
  }, [startTime, endTime]);

  const setNewDates = ({ start, end }: { start: Date; end: Date }) => {
    setStartTime(moment(start).unix());
    setEndTime(moment(end).unix());
  };

  const mapData = (array: SessionDTO[]) =>
    array.map((item: SessionDTO) => [
      item.participants[0].client.name,
      item.participants[0].client.email,
      moment(item.start_time).format('MMM DD, YYYY'),
      item.type,
      item.show,
    ]);

  const handleNextPage = () => {
    if (pagination['x-next-page']) getFilteredSessions(+pagination['x-next-page']);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    if (pagination['x-prev-page']) getFilteredSessions(+pagination['x-prev-page']);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setMappedData(mapData(session_details));
  }, [session_details]);

  const sessionDetailsSortHandler = (headingIndex: number, direction: SortDirection) => {
    const sortBy = sessionDetailsTableConfig.headings[headingIndex].toLowerCase();
    const sortDirection = direction === 'ascending' ? 'ASC' : 'DESC';

    getFilteredSessions(1, sortBy, sortDirection);
  };

  const onExport = () => ({ payload: session_details });

  const transformExportData = (item: SessionDTO) =>
    getNestedFields({
      'Client name': item.participants[0].client.name,
      Email: item.participants[0].client.email,
      Date: moment(item.start_time).format('MMM DD, YYYY'),
      Type: item.type,
      Show: item.show,
    });

  return (
    <div className={styles.sessions}>
      <MonthSwitch
        setNewDates={setNewDates}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      {!isLoaded || loading ? (
        <Loading />
      ) : (
        <div className={styles.sessions__tables}>
          <div className={styles.tables__earning_table}>
            <TableHeader fields={fields} isSession />
            <SessionsTable data={total?.liveSessions} fields={fields} isUnderline />

            {mobileView && <TableHeader fields={fields} isSession />}
            <SessionsTable data={total?.trialSessions} fields={fields} />
          </div>

          <div className={sessionDetailsClassNames}>
            <div className={styles.session_details__header}>
              <div className={styles.session_details__title_container}>
                <h3>Session details</h3>
                <p>( Showing 3 out of 3)</p>
              </div>
              <CSVButtonCustomize
                hideIcon
                title="Export"
                fileName="Session Details"
                getData={onExport}
                transformData={transformExportData}
              />
            </div>

            {!mobileView ? (
              <DataTable
                sortable={sessionDetailsTableConfig.sortable}
                headings={sessionDetailsTableConfig.headings}
                columnContentTypes={sessionDetailsTableConfig.columnContentTypes}
                rows={mappedData}
                hideScrollIndicator
                onSort={sessionDetailsSortHandler}
              />
            ) : (
              <MobileSessionTable list={session_details} />
            )}
            {!session_details.length && <EmptySearch />}

            {!!session_details.length && (
              <ListPagination
                pagination={pagination}
                onNext={handleNextPage}
                onPrevious={handlePrevPage}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
