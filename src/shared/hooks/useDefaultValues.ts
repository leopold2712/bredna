import { useState, useEffect } from 'react';
import { DEF_PRIMARY_LANGUAGE_ID, DEF_COUNTRY_ID, DEF_STATE_ID } from '../constants/onboarding';
import { MainDTO } from '../dtos/MainDTO';

type ReturnType = {
  defaultCountryID: number | null;
  defaultStateID: number | null;
  defaultLanguageID: number | null;
};

export const useDefaultValues = (
  countries?: MainDTO[],
  states?: MainDTO[],
  languages?: MainDTO[],
): ReturnType => {
  const [defaultCountryID, setDefCountryID] = useState<number | null>(null);
  const [defaultStateID, setDefStateID] = useState<number | null>(null);
  const [defaultLanguageID, setDefaultLanguageID] = useState<number | null>(null);

  useEffect(() => {
    if (countries?.length) {
      const country = countries.find((c) => c.iso === 'US');
      if (country) setDefCountryID(country.id);
      else setDefCountryID(DEF_COUNTRY_ID);
    }
    if (states?.length) {
      const state = states.find((s) => s.iso === 'CA');
      if (state) setDefStateID(state.id);
      else setDefStateID(DEF_STATE_ID);
    }
    if (languages?.length) {
      const language = languages.find((l) => l.iso === 'EN');
      if (language) setDefaultLanguageID(language.id);
      else setDefaultLanguageID(DEF_PRIMARY_LANGUAGE_ID);
    }
  }, [countries, states, languages]);

  return {
    defaultCountryID,
    defaultStateID,
    defaultLanguageID,
  };
};
