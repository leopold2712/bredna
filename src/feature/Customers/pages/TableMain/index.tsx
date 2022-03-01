import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { getCustomersAsync, getTags, getProducts } from '../../store/actions';
import { clearCustomers } from '../../store';
import CustomersPage from '../Table';
import CustomersLoading from '../TableLoading';
import { setMenuItem } from '../../../../shared/components/SideMenu';
import { MenuPages } from '../../../../shared/components/SideMenu/models/SideMenuState';
import { getSessions } from '../../../../shared/store/actions/getSessions';

export default function Customers(): JSX.Element {
  const dispatch = useDispatch();

  const [initLoading, setInitLoading] = useState(true);

  const initLoad = async () => {
    const startTime = moment().add(-30, 'day').unix();
    const endTime = moment().add(30, 'day').unix();

    await dispatch(
      getCustomersAsync({
        primitiveParams: {
          page: 1,
        },
      }),
    );

    await dispatch(getTags());
    await dispatch(getProducts());
    await dispatch(getSessions({ startTime, endTime, page: 1 }));

    setInitLoading(false);
  };

  useEffect(() => {
    initLoad();
    dispatch(setMenuItem(MenuPages.Clients));
    return () => {
      dispatch(clearCustomers());
    };
  }, []);

  return initLoading ? <CustomersLoading /> : <CustomersPage />;
}
