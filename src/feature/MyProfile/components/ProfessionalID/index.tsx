import React from 'react';
import { FormLayout, TextField } from '@shopify/polaris';
import { FormikState } from 'formik';
import { AutocompleteList } from '../../../../shared/components/AutocompleteList';
import TextFieldWithCounter from '../../../../shared/components/TextFieldWithCounter';
import { UpdateMyProfileDTO } from '../../dto/UpdateMyProfileDTO';
import { useAppSelector } from '../../../../main/store/hooks';
import { getProfessionalTitles, getStates } from '../../../../shared/store/meta/selectors';

import styles from '../../pages/MyProfile/my-profile.module.scss';

type Props = {
  formik: FormikState<UpdateMyProfileDTO>;
  loading: boolean;
  handleFormikField: (value: string | null | number, id: string) => void;
};

export const ProfessionalID = ({ formik, handleFormikField, loading }: Props): JSX.Element => {
  const professionalTitles = useAppSelector(getProfessionalTitles);
  const statesForSelect = useAppSelector(getStates);

  const handleProfessionalTitleText = (value: string) => {
    handleFormikField(value, 'professional_title_text');
    handleFormikField(null, 'professional_title_id');
  };

  const handleProfessionalTitleId = (value: number, id: string) => {
    handleFormikField(value, id);

    const title = professionalTitles.find((t) => +t.value === value);
    handleFormikField(title?.label || null, 'professional_title_text');
  };

  return (
    <FormLayout>
      <FormLayout.Group>
        <AutocompleteList
          label="Professional title"
          placeholder="Select professional title"
          fieldId="professional_title_id"
          selected={formik.values.professional_title_id}
          onSelect={handleProfessionalTitleId}
          options={professionalTitles}
          disabled={loading}
          error={
            formik.errors.professional_title_id &&
            formik.touched.professional_title_id &&
            !formik.values.professional_title_id
              ? formik.errors.professional_title_id
              : false
          }
          text={formik.values.professional_title_text}
          onTextChange={handleProfessionalTitleText}
        />
        <AutocompleteList
          label="License state"
          placeholder="Select license state"
          fieldId="state_id"
          selected={formik.values.state_id}
          onSelect={handleFormikField}
          options={statesForSelect}
          disabled={loading}
        />
      </FormLayout.Group>
      <div
        className={`${styles.myProfile__experienceSelectContainer} numberFieldWithoutBackgroundOnSpinners`}
      >
        <TextField
          id="years_of_experience"
          label="Years of practice"
          type="number"
          min={1}
          max={60}
          pattern="/^d*[1-9]d*$/"
          value={String(formik.values.years_of_experience)}
          onChange={handleFormikField}
          disabled={loading}
        />
      </div>
      <div className={styles.myProfile__aboutMeContainer}>
        <TextFieldWithCounter
          id="about"
          value={formik.values.about}
          label="About me"
          type="text"
          multiline={4}
          maxLength={2000}
          onChange={handleFormikField}
          placeholder="Elaborate any information you wish to share with your client"
          limit={2000}
          charactersCount={formik.values.about.length}
          disabled={loading}
        />
      </div>
    </FormLayout>
  );
};
