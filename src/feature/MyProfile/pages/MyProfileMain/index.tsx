import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { setMenuItem } from '../../../../shared/components/SideMenu';
import { MenuPages } from '../../../../shared/components/SideMenu/models/SideMenuState';
import { useDefaultValues } from '../../../../shared/hooks/useDefaultValues';
import { getMetaForProfile } from '../../../../shared/store/meta/selectors';
import { getMyProfile } from '../../store/actions/getMyProfile';
import MyProfileContent from '../MyProfile';
import MyProfileLoading from '../MyProfileLoading';

export default function MyProfile(): JSX.Element {
  const [initLoading, setInitLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { languages, countries, states } = useAppSelector(getMetaForProfile);

  const defaults = useDefaultValues(countries, states, languages);

  useEffect(() => {
    try {
      const initLoad = async () => {
        await dispatch(getMyProfile());
        setInitLoading(false);
      };

      initLoad();
      dispatch(setMenuItem(MenuPages.Settings));
    } catch (e) {
      console.log(e);
      setInitLoading(false);
    }
  }, []);

  return initLoading ? <MyProfileLoading /> : <MyProfileContent defaults={defaults} />;
}
