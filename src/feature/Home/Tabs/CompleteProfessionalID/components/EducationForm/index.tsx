import React, { useCallback, useEffect, useState } from 'react';
import { Button, FormLayout, Stack, TextField } from '@shopify/polaris';
import { useFormik, FormikTouched, setNestedObjectValues } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { useAppDispatch } from '../../../../../../main/store/hooks';
import type { EducationModel } from '../../models';
import { addEducation, editEducation, removeEducation } from '../../store';
import { toggleSaveIndicator } from '../../../../store';
import { YearPicker } from '../EducationYearsPicker';

import styles from './educationForm.module.scss';

interface IProps {
  education?: EducationModel;
  closeEducation: () => void;
}

export const EducationForm: React.FC<IProps> = ({
  education,
  closeEducation,
}: IProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [educationFormTouched, setEducationFormTouched] = useState(false);

  const formik = useFormik<EducationModel>({
    initialValues: {
      id: education ? education.id : '',
      degree: education ? education.degree : '',
      major: education ? education.major : '',
      college: education ? education.college : '',
      start_year: education ? education.start_year : moment().subtract(4, 'years').format('YYYY'),
      end_year: education ? education.end_year : moment().format('YYYY'),
    },
    validationSchema: yup.object().shape({
      degree: yup.string().required('This is a required field'),
      major: yup.string().required('This is a required field'),
      college: yup.string().required('This is a required field'),
      start_year: yup.number().positive(),
      end_year: yup
        .number()
        .positive()
        .min(yup.ref('start_year'), 'The end date must be greater than or equal to the start date'),
    }),
    onSubmit: (values, formikHelpers) => {
      if (values.id) dispatch(editEducation(values));
      else dispatch(addEducation(values));
      formikHelpers.resetForm({ values });
    },
    enableReinitialize: true,
  });

  const handleEducationEditChange = (field: string) => (value: string) => {
    setEducationFormTouched(true);
    formik.handleChange({ target: { id: field, value } });
  };

  const onClickSave = useCallback(async () => {
    const errors = await formik.validateForm();
    if (!Object.keys(errors).length) {
      formik.handleSubmit();
      closeEducation();
    } else {
      formik.setTouched(setNestedObjectValues<FormikTouched<EducationModel>>(errors, true));
    }
  }, []);

  const onClickCancel = useCallback(() => {
    if (formik.dirty) {
      formik.resetForm();
    }
    closeEducation();
  }, []);

  const onClickRemove = useCallback(() => {
    if (formik.dirty) {
      formik.resetForm();
    }
    if (education) dispatch(removeEducation(education));
    closeEducation();
  }, []);

  useEffect(() => {
    dispatch(toggleSaveIndicator(false));
  }, [formik.errors]);

  return (
    <div className={styles.educationForm}>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            label="Degrees"
            placeholder="e.g. Bachelor's degree"
            onChange={handleEducationEditChange('degree')}
            value={formik.values.degree}
            error={formik.errors.degree && !educationFormTouched && formik.errors.degree}
          />
          <TextField
            label="Fields of study"
            placeholder="e.g. Psychology"
            onChange={handleEducationEditChange('major')}
            value={formik.values.major}
            error={formik.errors.major && !educationFormTouched && formik.errors.major}
          />
        </FormLayout.Group>

        <FormLayout.Group>
          <TextField
            label="University / college"
            placeholder="e.g. Tel - Aviv university"
            onChange={handleEducationEditChange('college')}
            value={formik.values.college}
            error={formik.errors.college && !educationFormTouched && formik.errors.college}
          />
          <div className={styles.educationForm__selectYears}>
            <YearPicker
              label="Start date"
              selected={+formik.values.start_year}
              onChange={handleEducationEditChange('start_year')}
              error={formik.errors.start_year && educationFormTouched && formik.errors.start_year}
            />
            <YearPicker
              label="End date"
              selected={+formik.values.end_year}
              onChange={handleEducationEditChange('end_year')}
              error={formik.errors.end_year && educationFormTouched && formik.errors.end_year}
              prefferedValue={+formik.values.start_year}
            />
          </div>
        </FormLayout.Group>

        <Stack distribution="equalSpacing">
          {education !== undefined ? (
            <div style={{ color: '#D82C0D' }}>
              <Button outline destructive onClick={onClickRemove}>
                Remove
              </Button>
            </div>
          ) : (
            <></>
          )}

          <Stack spacing="extraTight">
            <div className={styles.actionButtons}>
              <Button onClick={onClickCancel}>Cancel</Button>
            </div>
            <div className={styles.actionButtons}>
              <Button onClick={onClickSave}>Save</Button>
            </div>
          </Stack>
        </Stack>
      </FormLayout>
    </div>
  );
};
