import type { SelectOption } from '@shopify/polaris';
import type { SkillDTO } from '../../../../feature/MyProfile/dto/UpdateMyProfileDTO';
import type { RootState } from '../../../../main/store/rootReducer';
import type { LanguageDTO } from '../../../dtos';
import type { MainDTO } from '../../../dtos/MainDTO';
import type { ProfessionalTitleDTO } from '../../../dtos/myProfile.dto';
import type { SimpleType } from '../../../dtos/simple.dto';
import type { CollegeDTO } from '../dtos/college.dto';
import { AutocompleteOptions } from '../types/AutocompleteOptions';

export const getCountriesForProfileSelect = (
  state: RootState,
): { id: number; label: string; value: string }[] =>
  state.meta.countries
    .map((country) => ({
      id: country.id,
      label: country.name,
      value: String(country.id),
    }))
    .sort((a, b) => (a.label > b.label ? 1 : -1));

export const getLanguagesForProfileSelect = (
  state: RootState,
): { label: string; value: string }[] =>
  state.meta.languages.map((language) => ({
    value: language.id.toString(),
    label: language.name,
  }));

export const getLanguagesForProfile = (state: RootState): { id: number; name: string }[] =>
  state.meta.languages.map((language) => ({
    id: language.id,
    name: language.name,
  }));

export const getTimezonesForProfileSelect = (
  state: RootState,
): { id: number; label: string; value: string }[] =>
  state.meta.timezones.map((timezone) => ({
    id: timezone.id,
    label: `(${timezone.iso}) ${timezone.name}`,
    value: String(timezone.id),
  }));

export const getCategoriesForNewHubSelect = (
  state: RootState,
): { id: number; label: string; value: string }[] =>
  state.meta.categories.map((category) => ({
    id: category.id,
    label: category.name,
    value: String(category.id),
  }));

export const getSearchCategories = (
  state: RootState,
): { id: number; label: string; value: string }[] =>
  state.meta.searchCategories.map((category) => ({
    id: category.id,
    label: category.name,
    value: String(category.id),
  }));

export const getDegrees = (state: RootState): SimpleType[] => state.meta.degrees;
export const getMajors = (state: RootState): SimpleType[] => state.meta.majors;
export const getProfessionalTitles = (state: RootState): AutocompleteOptions =>
  state.meta.professionalTitles.map((title) => ({ label: title.text, value: title.id.toString() }));
export const getSkills = (state: RootState): SkillDTO[] => state.meta.skills;
export const getStates = (state: RootState): AutocompleteOptions =>
  state.meta.states.map((s) => ({ label: s.name, value: s.id.toString() }));
export const getColleges = (state: RootState): CollegeDTO[] => state.meta.colleges;

export const getMetaForProfile = (
  state: RootState,
): { languages: LanguageDTO[]; countries: MainDTO[]; states: MainDTO[] } => ({
  languages: state.meta.languages,
  countries: state.meta.countries,
  states: state.meta.states,
});
