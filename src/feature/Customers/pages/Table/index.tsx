import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
  Avatar,
  Card,
  Filters,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  TextStyle,
  Tag,
  DatePicker,
} from '@shopify/polaris';
import { useWindowSize } from '@react-hook/window-size';
import classNames from 'classnames';
import {
  getAvailableProducts,
  getCustomers,
  getCustomersLoading,
  getSessionsForClients,
  getTagSelector,
} from '../../store/selectors';
import { getCustomersAsync } from '../../store/actions';
import { getCustomersAsyncForExport } from '../../store/actions/getCustomersAsyncForExport';
import { clientsToRows } from '../../utils/clientsToRows';
import {
  clientsTableAnalyticsLog,
  GAClientsTableTriggers,
} from '../../services/clients-tabe.google-analytics';
import { useAppSelector, useAppDispatch } from '../../../../main/store/hooks';
import useDebounce from '../../../../shared/hooks/useDebounce';
import { getNestedFields } from '../../../../shared/utils';
import { ClientsSorting, clientsSortOptions } from '../../constants';

import CSVButtonCustomize from '../../../../shared/components/CSVButtonCustomize';
import EmptySearch from '../../../../shared/components/EmptySearch';
import ListPagination from '../../../../shared/components/Pagination';
import { BeautySelect } from '../../../../shared/components/BeautySelect';
import {
  TypeFilter,
  CustomersTableHeader,
  CustomersEmptyState,
  TagsFilter,
  Divider,
} from '../../components';

import type { ClientsTableRow } from '../../models/ClientsTableRow';

import styles from './styles.module.scss';
import './styles.overload.scss';

const resourceName = {
  singular: 'client',
  plural: 'clients',
};

const initialDates = {
  start: new Date(),
  end: new Date(),
};

type datesType = typeof initialDates;

const CustomersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const tags = useAppSelector(getTagSelector);
  const { list: customers, pagination, isEmptySearch } = useAppSelector(getCustomers);
  const loading = useAppSelector(getCustomersLoading);
  const availableProducts = useAppSelector(getAvailableProducts);

  const [width] = useWindowSize();

  const [componentMounted, setComponentMounted] = useState(false); // <--- to prevent request with initial filter values
  const [rows, setRows] = useState<ClientsTableRow[]>([]);
  const sessions = useAppSelector(getSessionsForClients);

  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState(ClientsSorting.NAME_ASC);
  const [selectedPlans, setSelectedPlans] = useState<number[]>([]);
  const [{ month, year }, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState(initialDates);
  const [dateFilterTouched, setDateFilterTouched] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearchFilterRemove = useCallback(() => {
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_FILTER_REMOVE_RESULT)();
    setSearchValue('');
  }, []);

  const handlePlanFilterRemove = useCallback((id = -1) => {
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_FILTER_REMOVE_RESULT)();
    if (id === -1) setSelectedPlans([]);
    else {
      setSelectedPlans((prev) => {
        const res = [...prev];
        const index = res.indexOf(id);
        res.splice(index, 1);
        return res;
      });
    }
  }, []);
  const handleDateFilterRemove = useCallback(() => {
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_FILTER_REMOVE_RESULT)();
    setDateFilterTouched(false);
    setSelectedDates(initialDates);
  }, []);
  const handleTagFilterRemove = useCallback((tag = '') => {
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_FILTER_REMOVE_RESULT)();
    if (tag === '') setSelectedTags([]);
    else {
      setSelectedTags((prev) => {
        const res = [...prev];
        const index = res.indexOf(tag);
        res.splice(index, 1);
        return res;
      });
    }
  }, []);
  const handleFiltersRemove = useCallback(() => {
    handleSearchFilterRemove();
    handlePlanFilterRemove();
    handleTagFilterRemove();
  }, []);

  const searchDebounce = useDebounce(searchValue, 300);

  const handleTypeFilter = (planID: number) => {
    if (selectedPlans.includes(planID))
      setSelectedPlans((prev) => prev.filter((id) => id !== planID));
    else {
      setSelectedPlans((prev) => [...prev, planID]);
    }
  };

  const handleMonthChange = useCallback((month, year) => setDate({ month, year }), []);

  const handleDateFilter = (arg: datesType) => {
    const label = `${moment(arg.start).format('YYYY.MM.DD')}-${moment(arg.end).format(
      'YYYY.MM.DD',
    )}`;
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENT_NEXT, label)();
    setDateFilterTouched(true);
    setSelectedDates(arg);
  };

  const handleSelectTag = (selected: string[]) => {
    const label = selected.join(', ');
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_TAG, label)();
    setSelectedTags(selected);
  };

  const filters = [
    {
      key: 'planType',
      label: 'Plan type',
      filter: (
        <TypeFilter
          items={availableProducts.map((product) => ({
            id: product.id,
            content: product.name,
            onAction: () => {
              if (!selectedPlans.includes(product.id))
                clientsTableAnalyticsLog(
                  GAClientsTableTriggers.CLIENTS_PLAN,
                  product.name.toLowerCase(),
                )();
              handleTypeFilter(product.id);
            },
          }))}
          selected={selectedPlans}
        />
      ),
      shortcut: true,
    },
    {
      key: 'nextInteractionDate',
      label: 'Next interaction date',
      filter: (
        <div className={styles.datePickerWrapper}>
          <DatePicker
            month={month}
            year={year}
            onChange={handleDateFilter}
            onMonthChange={handleMonthChange}
            selected={selectedDates}
            multiMonth
            allowRange
          />
        </div>
      ),
      shortcut: true,
    },
    {
      key: 'tagInclude',
      label: 'Tags',
      filter: <TagsFilter tags={tags} selectedItems={selectedTags} onChange={handleSelectTag} />,
      shortcut: true,
    },
  ];

  useEffect(() => {
    const updatedRows = clientsToRows(customers, sessions);
    setRows(updatedRows);
  }, [customers]);

  const getFilteredCustomers = (page = 1) => {
    const [sortBy, sortDirection] = sortValue.split(' ');
    dispatch(
      getCustomersAsync({
        primitiveParams: {
          page,
          q: searchDebounce.trim(),
          ...(dateFilterTouched && {
            nextInteractionFrom: moment(selectedDates.start).startOf('day').unix(),
            nextInteractionThrough: moment(selectedDates.end).endOf('day').unix(),
          }),
          sortBy: sortBy as ClientsSorting,
          sortDirection: sortDirection as 'ASC' | 'DESC',
        },
        referenceParams: {
          productIds: selectedPlans,
          tags: selectedTags,
        },
      }),
    );
  };

  useEffect(() => {
    if (componentMounted) getFilteredCustomers();
    else setComponentMounted(true);
  }, [searchDebounce, selectedPlans, selectedDates, selectedTags, sortValue]);

  const handleNextPage = () => {
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_PAGINATION)();
    if (pagination['x-next-page']) getFilteredCustomers(+pagination['x-next-page']);
    window.scrollTo(0, 0);
  };

  const handlePrevPage = () => {
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_PAGINATION)();
    if (pagination['x-prev-page']) getFilteredCustomers(+pagination['x-prev-page']);
    window.scrollTo(0, 0);
  };

  const handleSortSelect = (arg: string) => setSortValue(arg as ClientsSorting);

  const checkIfDates = (arg: string | datesType): arg is datesType => !!(arg as datesType).start;

  function isEmpty(value: unknown) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return String(value).trim().length === 0 || value == null;
  }

  function disambiguateLabel(key: string, value: string | datesType): string {
    switch (key) {
      case 'searchValue':
        return `Search value: ${value}`;
      case 'planType':
        return `Plan type: ${value}`;
      case 'nextInteractionDate': {
        if (checkIfDates(value)) {
          if (value.start === value.end)
            return `Selected date: ${moment(value.start).format('DD MMM YYYY')}`;
          return `Selected dates: From ${moment(value.start).format('DD MMM YYYY')} to ${moment(
            value.end,
          ).format('DD MMM YYYY')}`;
        }
        return '';
      }
      case 'tagInclude':
        return `Tag: ${value}`;
      default:
        return '';
    }
  }
  const appliedFilters = [];
  if (!isEmpty(searchValue)) {
    const key = 'searchValue';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, searchValue),
      onRemove: handleSearchFilterRemove,
    });
  }
  if (!isEmpty(selectedPlans)) {
    const key = 'planType';
    selectedPlans
      .map((id) => {
        const plan = availableProducts.find((product) => product.id === id);
        return {
          id: plan?.id,
          name: plan?.name,
        };
      })
      .forEach((plan) => {
        if (plan.name) {
          appliedFilters.push({
            key: plan.id,
            label: disambiguateLabel(key, plan.name),
            onRemove: handlePlanFilterRemove,
          });
        }
      });
  }
  if (!isEmpty(selectedDates) && dateFilterTouched) {
    const key = 'nextInteractionDate';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, selectedDates),
      onRemove: handleDateFilterRemove,
    });
  }
  if (!isEmpty(selectedTags)) {
    const key = 'tagInclude';
    selectedTags.forEach((tag) => {
      appliedFilters.push({
        key: tag,
        label: disambiguateLabel(key, tag),
        onRemove: handleTagFilterRemove,
      });
    });
  }

  const transformData = (item: ClientsTableRow) => {
    const transformedItem = getNestedFields({
      'Client name': item.name,
      'Current plan type': item.currentPlan,
      'Expiration date': item.expiredAt,
      Usage: item.usage,
      'Last interaction date': item.lastInteractionDate,
      'Next interaction date': item.nextInteractionDate,
      Tags: item.tags.map((tag) => tag.name).join(', '),
    });
    return transformedItem;
  };

  const onExport = async () => {
    clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_EXPORT)();
    return dispatch(
      getCustomersAsyncForExport({
        primitiveParams: {
          q: searchDebounce,
          ...(dateFilterTouched && {
            nextInteractionFrom: moment(selectedDates.start).startOf('day').unix(),
            nextInteractionThrough: moment(selectedDates.end).endOf('day').unix(),
          }),
        },
        referenceParams: {
          productIds: selectedPlans,
          tags: selectedTags,
        },
      }),
    );
  };

  function renderItem(item: ClientsTableRow): JSX.Element {
    const {
      id,
      name,
      thumbnail,
      currentPlan,
      expiredAt,
      usage,
      lastInteractionDate,
      nextInteractionDate,
      tags,
    } = item;

    const nameClassNames = classNames(styles.itemCell, 'fs-mask', {
      [styles.emptyCell]: name.length === 0,
    });

    const media = name.length ? (
      <div className="clients__avatar-overload fs-exclude">
        <Avatar size="medium" source={thumbnail} />
      </div>
    ) : undefined;

    return (
      <ResourceItem
        id={id}
        url={`${history.location.pathname}/${id.slice(0, id.indexOf('-'))}`}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        onClick={clientsTableAnalyticsLog(GAClientsTableTriggers.CLIENTS_SINGLE_CLIENT, name)}
      >
        <div className={`${styles.resourceItem} ${name.length === 0 ? styles.emptyName : ''} `}>
          <div className={nameClassNames}>
            {width < 1200 ? (
              <p className={styles.customerInformationMobile}>{name}</p>
            ) : (
              <p className={styles.customerInformation}>{name}</p>
            )}
          </div>
          {width < 1200 && (
            <div style={{ padding: '15px 0' }}>
              <Divider />
            </div>
          )}
          <div className={styles.itemCell}>
            {width < 1200 ? (
              <span className={styles.planTextMobile}>{currentPlan}</span>
            ) : (
              <span className={styles.wideText}>{currentPlan}</span>
            )}
          </div>
          {width < 1200 && (
            <div className={styles.itemCell}>
              <div className={styles.paddingCell}>
                <TextStyle>Usage:&nbsp;</TextStyle>
                <span className={styles.strongTextMobile}>{usage}</span>
              </div>
            </div>
          )}
          <div className={styles.itemCell}>
            {width < 1200 ? (
              <div className={styles.paddingCell}>
                <TextStyle>Exp. date:&nbsp; </TextStyle>
                <span className={styles.strongTextMobile}>{expiredAt}</span>
              </div>
            ) : (
              <p>{expiredAt}</p>
            )}
          </div>
          {width >= 1200 && (
            <div className={styles.itemCell}>
              <p>{usage}</p>
            </div>
          )}
          <div className={styles.itemCell}>
            {width < 1200 ? (
              <div className={styles.paddingCell}>
                <TextStyle>Last interaction date:&nbsp; </TextStyle>
                <span className={`${width < 1200 ? styles.strongTextMobile : ''}`}>
                  {lastInteractionDate}
                </span>
              </div>
            ) : (
              <p>{lastInteractionDate}</p>
            )}
          </div>
          <div className={styles.itemCell}>
            {width < 1200 ? (
              <div className={styles.paddingCell}>
                <TextStyle>Next interaction date:&nbsp; </TextStyle>
                <span className={styles.strongTextMobile}>{nextInteractionDate}</span>
              </div>
            ) : (
              <p>{nextInteractionDate}</p>
            )}
          </div>
          {width < 1200 && (
            <div style={{ padding: '15px 0' }}>
              <Divider />
            </div>
          )}
          <div className={styles.itemCell}>
            <div className={`clients__tags-overload ${styles.tags}`}>
              {tags && tags.length
                ? tags.map((tag) => (
                    <div className={styles.tagWrapper}>
                      <Tag>{tag.name}</Tag>
                    </div>
                  ))
                : ''}
            </div>
          </div>
        </div>
      </ResourceItem>
    );
  }

  if (!customers.length && !isEmptySearch) {
    return <CustomersEmptyState />;
  }

  return (
    <Page
      title="Clients"
      fullWidth
      primaryAction={
        <CSVButtonCustomize
          fileName="my-clients"
          title="Clients"
          hideIcon
          getData={onExport}
          transformData={transformData}
        />
      }
    >
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <div className="clients__filters-overload">
                <div className={styles.clientsFilters}>
                  <div className={classNames(styles.filters, 'fs-mask')}>
                    <Filters
                      filters={filters}
                      onClearAll={handleFiltersRemove}
                      queryPlaceholder="Filter"
                      queryValue={searchValue}
                      onQueryChange={setSearchValue}
                      onQueryFocus={clientsTableAnalyticsLog(
                        GAClientsTableTriggers.CLIENTS_FILTER_INPUT,
                      )}
                      onQueryClear={handleSearchFilterRemove}
                      appliedFilters={appliedFilters}
                    />
                  </div>

                  <BeautySelect
                    id="sort"
                    options={clientsSortOptions}
                    onChange={handleSortSelect}
                    value={sortValue}
                    useExternalLabels
                    label="Sort by"
                    inlineLabel
                  />
                </div>
              </div>
              {width >= 1200 && (
                <CustomersTableHeader
                  items={[
                    'Client name',
                    'Current plan type',
                    'Expiration date',
                    'Usage',
                    'Last interaction date',
                    'Next interaction date',
                    'Tags',
                  ]}
                />
              )}
              <div className="clients__resource-list-overload">
                <ResourceList
                  resourceName={resourceName}
                  items={rows}
                  renderItem={renderItem}
                  emptyState={<EmptySearch itemName="client" />}
                  showHeader={width < 600}
                  loading={loading}
                />
              </div>
              {!isEmptySearch && (
                <ListPagination
                  pagination={pagination}
                  onNext={handleNextPage}
                  onPrevious={handlePrevPage}
                />
              )}
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default CustomersPage;
