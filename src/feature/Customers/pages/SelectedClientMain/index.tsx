import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SelectedClient from '../SelectedClient';
import ClientLoading from '../SelectedClientLoading';
import Page404 from '../../../../shared/components/Page404';
import { setMenuItem } from '../../../../shared/components/SideMenu';
import { MenuPages } from '../../../../shared/components/SideMenu/models/SideMenuState';
import { useAppDispatch } from '../../../../main/store';
import { getClientAsync } from '../../store/actions';

const SelectedClientMain = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [pageNotFound, setPageNotFound] = useState(false);

  const initialLoading = async () => {
    setLoading(true);
    await dispatch(getClientAsync({ id: +id }));
    setLoading(false);
  };

  useEffect(() => {
    dispatch(setMenuItem(MenuPages.Clients));
    initialLoading();
  }, [id]);

  if (loading) {
    return <ClientLoading />;
  }

  if (pageNotFound) {
    return <Page404 />;
  }

  return <SelectedClient />;
};

export default SelectedClientMain;
