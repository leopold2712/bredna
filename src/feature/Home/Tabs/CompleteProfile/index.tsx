import { Card, DropZone, FormLayout, InlineError, Select, TextField } from '@shopify/polaris';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useFormik } from 'formik';
import { CropImageModal } from '../../../../shared/components/CropImageModal';
import FileView, { PictureType } from '../../../../shared/components/FileView';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';
import { getFileLink } from '../../../MyProfile/store/actions/getFileLink';
import { addTherapistProfileInfo } from '../../store/actions/addTherapistProfileInfo';
import {
  toggleSkipIndicator,
  toggleSaveIndicator,
  setActivePage,
  setCompleteProfileStepValues,
} from '../../store';
import { TabSheets } from '../../constants/TabSheet';
import { ProfileEvents } from '../../constants/EventsTriggers';
import { profileLogger } from '../../utils/analyticsService';
import { eliminatePolarisCardGap } from '../../utils/hacks';
import { fetchFileFromBlobUrl } from '../../../../shared/utils';
import { getUser } from '../../../Onboarding/store';
import {
  getMetaForProfile,
  getProfessionalTitles,
  getStates,
} from '../../../../shared/store/meta/selectors';
import { useDefaultValues } from '../../../../shared/hooks/useDefaultValues';
import { AutocompleteList } from '../../../../shared/components/AutocompleteList';
import { validImageTypes } from '../../../../shared/constants/dropzoneValidTypes';

import styles from './completeProfile.module.scss';
import './completeProfile.overload.scss';

type Values = {
  professional_title_id: number | null;
  professional_title_text: string | null;
  about: string;
  state_id: number | null;
};

export const CompleteProfile: React.FC = () => {
  const dispatch = useAppDispatch();

  const therapistInfo = useAppSelector(getUser);
  const professionalTitles = useAppSelector(getProfessionalTitles);
  const statesForSelect = useAppSelector(getStates);
  const { languages, countries, states } = useAppSelector(getMetaForProfile);

  const defaults = useDefaultValues(countries, states, languages);

  const unsavedCompleteProfileData = useAppSelector(
    (state) => state.home.onboardingSteps.completeProfile,
  );
  const { skipActionIndicator, saveActionIndicator } = useAppSelector((state) => state.home);

  const [picFile, setPicFile] = useState<PictureType>(therapistInfo?.original_image);
  const [picSizeError, setPicSizeError] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [isOpenFileUpload, setIsOpenFileUpload] = useState(false);
  const [picFiletouched, setPicFileTouced] = useState(false);

  const uploadImage = async (imageFile: PictureType, imageUrl: string | null) => {
    let fileToUpload: Blob | PictureType = imageFile;
    // download file from blob url, case when user have unsaved fields(image for example) and jump from one step to another
    // info: images saved in redux in blob-url format
    if (typeof fileToUpload === 'string') {
      fileToUpload = await fetchFileFromBlobUrl(fileToUpload, imageUrl);
    }
    const { payload: profileFileLink } =
      fileToUpload && typeof fileToUpload !== 'string'
        ? await dispatch(getFileLink({ file: fileToUpload as File, param: 'image' }))
        : { payload: undefined };

    return profileFileLink as string | undefined;
  };

  const formik = useFormik<Values>({
    initialValues: {
      professional_title_id: unsavedCompleteProfileData.title || null,
      professional_title_text: unsavedCompleteProfileData.title || null,
      about: unsavedCompleteProfileData.about || '',
      state_id: unsavedCompleteProfileData.state_id || defaults.defaultStateID,
    },
    onSubmit: async (values) => {
      let profileFileLink;
      if (picFiletouched)
        profileFileLink = await uploadImage(picFile, unsavedCompleteProfileData?.fileName);
      const { professional_title_id, about, state_id, professional_title_text } = values;
      if (
        professional_title_id ||
        about ||
        state_id ||
        profileFileLink ||
        professional_title_text
      ) {
        await dispatch(
          addTherapistProfileInfo({
            professional_title_id,
            professional_title_text: professional_title_id ? null : professional_title_text,
            about,
            state_id: state_id ? +state_id : defaults.defaultStateID,
            ...(picFiletouched && { original_image: profileFileLink }),
            country_id: defaults.defaultCountryID,
            primary_language: defaults.defaultLanguageID,
          }),
        );
      }
      setPicFileTouced(false);
      dispatch(toggleSaveIndicator(false));
      dispatch(setActivePage(TabSheets.completeProfessionalID));
    },
  });

  const toggleOpenFileDialog = useCallback(() => {
    setOpenFileDialog(!openFileDialog);
  }, [openFileDialog]);

  const uploadCroppedFile = (file: File) => {
    // cloudinary limitation for uploaded pictures
    if (file.size < 10000000) {
      setPicFile(file);
      setPicSizeError(false);
      profileLogger(ProfileEvents.PHOTO);
      setPicFileTouced(true);
    } else {
      setPicSizeError(true);
    }
  };

  useEffect(() => {
    if (unsavedCompleteProfileData.fileSource) {
      setPicFile(unsavedCompleteProfileData.fileSource);
    }
  }, [unsavedCompleteProfileData]);

  useEffect(() => {
    if (saveActionIndicator) {
      if (formik.dirty || formik.isValid) {
        formik.handleSubmit();
      } else {
        dispatch(toggleSaveIndicator(false));
        dispatch(setActivePage(TabSheets.completeProfessionalID));
      }

      return;
    }
    if (skipActionIndicator) {
      dispatch(toggleSkipIndicator(false));
      dispatch(setActivePage(TabSheets.completeProfessionalID));
    }
  }, [saveActionIndicator, skipActionIndicator]);

  useEffect(() => {
    if (
      unsavedCompleteProfileData.title ||
      unsavedCompleteProfileData.about ||
      unsavedCompleteProfileData.state_id
    ) {
      formik.setValues({
        about: therapistInfo?.about || unsavedCompleteProfileData.about || '',
        professional_title_id:
          therapistInfo?.professional_title?.id || unsavedCompleteProfileData.title || null,
        professional_title_text:
          therapistInfo?.professional_title?.text || unsavedCompleteProfileData.title || null,
        state_id:
          therapistInfo?.state?.id ||
          unsavedCompleteProfileData.state_id ||
          defaults.defaultStateID,
      });
      return;
    }
    if (therapistInfo) {
      formik.setValues({
        about: therapistInfo.about,
        professional_title_id: therapistInfo.professional_title?.id,
        professional_title_text: therapistInfo.professional_title?.text,
        state_id: therapistInfo.state?.id,
      });
    }
  }, [therapistInfo]);

  useEffect(() => {
    dispatch(
      setCompleteProfileStepValues({
        about: formik.values.about || null,
        title: formik.values.professional_title_id || null,
        state_id: formik.values.state_id || null,
        fileSource:
          (picFile && typeof picFile === 'object' && window.URL.createObjectURL(picFile)) ||
          unsavedCompleteProfileData.fileSource ||
          null,
        // @ts-ignore
        fileName: picFile?.name || unsavedCompleteProfileData.fileName || null,
      }),
    );
  }, [formik.values, picFile]);

  const handleImageDropZoneDrop = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    uploadCroppedFile(acceptedFiles[0]);
  }, []);

  const handleFormField = useCallback((value, id) => {
    formik.handleChange({ target: { id, value } });
  }, []);

  useLayoutEffect(() => {
    eliminatePolarisCardGap();
  }, []);

  const handleProfessionalTitleText = (value: string) => {
    formik.handleChange({ target: { id: 'professional_title_text', value } });
    formik.handleChange({ target: { id: 'professional_title_id', value: null } });
  };

  const handleProfessionalTitleId = (value: number, id: string) => {
    formik.handleChange({ target: { id, value } });

    const title = professionalTitles.find((t) => +t.value === value);
    formik.handleChange({
      target: { id: 'professional_title_text', value: title?.label || null },
    });
  };

  const handleTextFieldChange = useCallback((value, id) => {
    let valueToChange = value;
    if (id === 'years_of_experience') {
      if (value > 60) valueToChange = 60;
      if (value < 1) valueToChange = '';
    } // 60 - max years experience
    formik.handleChange({ target: { id, value: valueToChange } });
  }, []);

  return (
    <div className={styles.profile}>
      <Card.Section title={<p className={styles.sectionTitle}>Complete profile</p>}>
        <FormLayout>
          <p className={styles.description}>
            You are the professional, share your highlights with your clients. We advise you to
            complete this step as this is the face of your therapist page.
          </p>

          <p className={styles.sectionTitle}>General profile</p>

          <FormLayout.Group>
            <div>
              <AutocompleteList
                label="Professional title"
                placeholder="Choose professional title"
                fieldId="professional_title_id"
                selected={formik.values.professional_title_id}
                onSelect={handleProfessionalTitleId}
                options={professionalTitles}
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
            </div>
            <AutocompleteList
              label="License state"
              placeholder="Select license state"
              fieldId="state_id"
              selected={formik.values.state_id}
              onSelect={handleTextFieldChange}
              options={statesForSelect}
            />
          </FormLayout.Group>
          <div>
            <div className={styles.labelValue}>
              <div>About Me</div>
              <div className={styles.value}>{formik.values.about?.length}/2000</div>
            </div>
            <TextField
              id="about"
              name="about"
              label=""
              placeholder="Elaborate any information you wish to share with your client"
              value={formik.values.about}
              onChange={handleFormField}
              multiline={4}
            />
          </div>
        </FormLayout>
      </Card.Section>

      <div className={styles.pictureSection}>
        <div className={styles.pictureTitle}>Profile Picture</div>
        <div id="picFile" className="complete-profile-drop-zone">
          <DropZone
            disabled={false}
            onDrop={handleImageDropZoneDrop}
            allowMultiple={false}
            accept="image/*"
            openFileDialog={openFileDialog}
            onFileDialogClose={toggleOpenFileDialog}
            onClick={() => setIsOpenFileUpload(true)}
          >
            <FileView
              file={picFile}
              validTypes={validImageTypes}
              buttonText="Add file"
              imageHint="or drop files to upload"
              showLimitText={false}
            />
          </DropZone>

          <CropImageModal
            title="Upload a photo"
            isOpenModal={isOpenFileUpload}
            uploadCroppedImage={(image: File) => uploadCroppedFile(image)}
            closeModal={() => setIsOpenFileUpload(false)}
            aspectRatio={1 / 1}
            accept="image/*"
          />

          {picSizeError && (
            <InlineError
              fieldID="image-wrapper"
              message="The uploaded image must be less than 10MB"
            />
          )}
        </div>
        <div />
      </div>
    </div>
  );
};
