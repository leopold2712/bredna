/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  DropZone,
  FormLayout,
  Layout,
  Page,
  TextField,
  TextStyle,
} from '@shopify/polaris';

import { useWindowWidth } from '@react-hook/window-size';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../../main/store/hooks';

import { updateMyProfileAsync } from '../../store';
import { getMyProfile } from '../../store/actions/getMyProfile';
import { getLoadedProfile } from '../../store/selectors';
import {
  getCountriesForProfileSelect,
  getLanguagesForProfileSelect,
  getSkills,
  getStates,
  getTimezonesForProfileSelect,
  getMetaForProfile,
} from '../../../../shared/store/meta/selectors';

import formStorage from '../../../../shared/utils/formStorage';
import { getFileLink } from '../../store/actions/getFileLink';
import { deepCompare } from '../../../../shared/utils/objectsDeepCompare';
import { parseNumbers } from '../../../../shared/utils/parseNumbers';
import { mapDtoToValues } from '../../utils/mapDtoToValues';
import { validateDropZone } from '../../../../shared/utils/validateDropZone';

import HeyToast from '../../../../shared/components/HeyToast';
import FileView, { PictureType } from '../../../../shared/components/FileView';
import { CropImageModal } from '../../../../shared/components/CropImageModal';
import { SaveBar } from '../../../../shared/components/Header/SaveBar';
import { MultySelectPopover } from '../../../../shared/components/MultyselectList';
import { EducationYearsPopover } from '../../components/EducationYearsPopover';
import { AutocompleteList } from '../../../../shared/components/AutocompleteList';
import { BeautySelect } from '../../../../shared/components/BeautySelect';
import { IntroVideo } from '../../components/IntroVideo';
import { ProfessionalID } from '../../components/ProfessionalID';
import { CertificateForm } from '../../../../shared/components/Certificates/CertificatesForm';

import { validImageTypes } from '../../../../shared/constants/dropzoneValidTypes';
import { educationFormSchema, schema } from '../../constants/validations';
import { genders } from '../../constants/genders';
import { emptyEducation } from '../../constants/initialValues';
import { onlyCharRegEx } from '../../constants/regEx';

import type { SkillDTO, UpdateMyProfileDTO } from '../../dto/UpdateMyProfileDTO';
import type { EducationDTO, EducationDTOForUpdate } from '../../../../shared/dtos/education.dto';
import type { CertificateDTO } from '../../../../shared/dtos/certificate.dto';
import type { SimpleType } from '../../../../shared/dtos/simple.dto';

import styles from './my-profile.module.scss';
import './myProfile.overload.scss';

type Props = {
  defaults: {
    defaultCountryID: number | null;
    defaultStateID: number | null;
    defaultLanguageID: number | null;
  };
};

const scrollValidationOrder = ['first_name', 'last_name', 'phone_number', 'thumbnail'];

export default function MyProfileContent({ defaults }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const myProfileInfo = useAppSelector(getLoadedProfile);

  const languagesForSelect = useAppSelector(getLanguagesForProfileSelect);
  const timezones = useAppSelector(getTimezonesForProfileSelect);
  const skills = useAppSelector(getSkills);
  const statesForSelect = useAppSelector(getStates);
  const countriesForSelect = useAppSelector(getCountriesForProfileSelect);
  const { languages } = useAppSelector(getMetaForProfile);

  const [thumbnailFile, setThumbnailFile] = useState<PictureType>(myProfileInfo?.original_image);
  const [introVideoFile, setIntroVideoFile] = useState<PictureType>(myProfileInfo?.video);
  const [videoThumbnailFile, setVideoThumbnailFile] = useState<PictureType>(
    myProfileInfo.full_video_image_url,
  );
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [isOpenFileUpload, setIsOpenFileUpload] = useState(false);

  const [isOpenIntroVideoFileUpload, setIsOpenIntroVideoFileUpload] = useState(false);

  const [isTimezoneCorrect, setIsTimeZoneCorrect] = useState(true);
  const [isThumbnailChanged, setIsThumbnailChanged] = useState(false);
  const [isIntroVideoChanged, setIsIntroVideoChanged] = useState(false);
  const [isVideoThumbnailChanged, setIsVideoThumbnailChanged] = useState(false);
  const [timezoneError, setTimezoneError] = useState(false);

  const [educationFormTouched, setEducationFormTouched] = useState(false);
  const [educationIndexForEdit, setEducationIndexForEdit] = useState<number | null>(null);

  const [photoLoading, setPhotoLoading] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);

  const formik = useFormik<UpdateMyProfileDTO>({
    initialValues: mapDtoToValues(defaults, myProfileInfo),
    validationSchema: schema,
    onSubmit: async (values, formikHelpers) => {
      try {
        setProfileUpdateLoading(true);
        let thumbnailLink;
        let coverVideoLink;
        let videoThumbnailLink;

        if (isThumbnailChanged) {
          setPhotoLoading(true);
          const { payload: profileFileLink } =
            thumbnailFile && typeof thumbnailFile !== 'string'
              ? await dispatch(getFileLink({ file: thumbnailFile as File, param: 'image' }))
              : { payload: undefined };
          thumbnailLink = profileFileLink as string;
          setPhotoLoading(false);
        }

        if (thumbnailFile === null) {
          thumbnailLink = '';
        }

        if (isIntroVideoChanged) {
          if (introVideoFile === null) {
            coverVideoLink = null;
            videoThumbnailLink = null;
          } else {
            setVideoLoading(true);
            const { payload: profileFileLink } = introVideoFile
              ? await dispatch(getFileLink({ file: introVideoFile as File, param: 'video' }))
              : { payload: undefined };
            coverVideoLink = profileFileLink as string;
            setVideoLoading(false);
          }
        }

        if (isVideoThumbnailChanged) {
          if (videoThumbnailFile === null) {
            videoThumbnailLink = null;
          } else {
            const { payload: profileFileLink } = videoThumbnailFile
              ? await dispatch(getFileLink({ file: videoThumbnailFile as File, param: 'image' }))
              : { payload: undefined };
            videoThumbnailLink = profileFileLink as string;
          }
        }

        if (isTimezoneCorrect) {
          const comparedValues = deepCompare(formik.initialValues, values);

          const dto = parseNumbers(comparedValues);

          if (dto.language_ids) dto.language_ids = values.language_ids;
          if (dto.skills) dto.skills = values.skills;
          if (dto.education) dto.education = values.education;
          if (dto.gender) dto.gender = values.gender?.split(' ').join('-').toLowerCase();
          if (dto.professional_title_id) dto.professional_title_text = null;
          dto.phone_number = values.phone_number.toString();

          await dispatch(
            updateMyProfileAsync({
              ...(dto as UpdateMyProfileDTO),
              ...(isThumbnailChanged && { original_image: thumbnailLink }),
              ...(isIntroVideoChanged && { cover_video: coverVideoLink }),
              ...(isVideoThumbnailChanged && { cover_video_original_image: videoThumbnailLink }),
            }),
          );
          dispatch(getMyProfile());
          formStorage.remove('my-profile');
        } else {
          HeyToast.show({ text: 'Incorrect timezone', isError: true });
        }
        setTimezoneError(false);
      } catch (e) {
        console.log(e);
      } finally {
        formikHelpers.resetForm({ values });
        setProfileUpdateLoading(false);
        setIsThumbnailChanged(false);
        setIsIntroVideoChanged(false);
        setIsVideoThumbnailChanged(false);
      }
    },
  });

  const educationFormik = useFormik<EducationDTOForUpdate>({
    initialValues: emptyEducation,
    validationSchema: educationFormSchema,
    onSubmit: async (values, formikHelpers) => {
      // do nothing because we need only validation logic
    },
  });

  const [addEducationSectionOpen, setAddEducationSectionOpen] = useState(
    formik.values.education.length === 0,
  );

  const submitWithValidation = async () => {
    formik.handleSubmit();

    const errors = await formik.validateForm();
    const fieldsWithError = Object.keys(errors);

    if (fieldsWithError) {
      for (let i = 0; i < scrollValidationOrder.length; i += 1) {
        const elementId = fieldsWithError.find((id) => id === scrollValidationOrder[i]);

        if (elementId) {
          const element = document.getElementById(elementId);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          break;
        }
      }
    }
  };

  const toggleOpenFileDialog = useCallback(() => {
    setOpenFileDialog(!openFileDialog);
  }, [openFileDialog]);

  useEffect(() => {
    const oldData = formStorage.read(`my-profile`);
    if (oldData?.dirty) {
      formik.setValues(oldData.values as UpdateMyProfileDTO);
    } else if (myProfileInfo) {
      formik.resetForm({ values: mapDtoToValues(defaults, myProfileInfo) });
    }
  }, [myProfileInfo, defaults]);

  useEffect(() => {
    formStorage.update('my-profile', { values: formik.values, dirty: formik.dirty });
  }, [formik.values, formik.dirty]);

  const handleTextFieldChange = useCallback((value, id) => {
    let valueToChange = value;
    if (id === 'years_of_experience') {
      if (value > 60) valueToChange = 60;
      if (value < 1) valueToChange = '';
    } // 60 - max years experience
    formik.handleChange({ target: { id, value: valueToChange } });
  }, []);

  const handleChangeThumbnail = (file: File) => {
    setThumbnailFile(file);
    setIsThumbnailChanged(true);
  };

  const removeIntroVideo = () => {
    setIntroVideoFile(null);
    setVideoThumbnailFile(null);
    setIsVideoThumbnailChanged(true);
    setIsIntroVideoChanged(true);
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setIsThumbnailChanged(true);
  };

  const handleProfileDropZoneDrop = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    if (validateDropZone(_dropFiles, acceptedFiles, validImageTypes))
      handleChangeThumbnail(acceptedFiles[0]);
  }, []);

  const handleIntroVideoDrop = useCallback((file: File) => {
    setIsIntroVideoChanged(true);
    setIsVideoThumbnailChanged(true);
    setIntroVideoFile(file);
    setVideoThumbnailFile(null);
  }, []);

  const handleIntroThumbnailDrop = useCallback((file: File) => {
    setIsVideoThumbnailChanged(true);
    setVideoThumbnailFile(file);
  }, []);

  const discardChanges = () => {
    setTimezoneError(false);
    setIsTimeZoneCorrect(true);
    setIsThumbnailChanged(false);
    setIsIntroVideoChanged(false);
    setIsVideoThumbnailChanged(false);
    setThumbnailFile(myProfileInfo?.original_image);
    setIntroVideoFile(myProfileInfo?.video);
    setVideoThumbnailFile(myProfileInfo.full_video_image_url);
    formStorage.remove('my-profile');
    formik.resetForm({
      values: mapDtoToValues(defaults, myProfileInfo),
    });
  };

  useEffect(
    () =>
      thumbnailFile?.toString().length
        ? formik.setFieldError('thumbnail', undefined)
        : formik.setFieldError('thumbnail', 'This is a required field'),
    [thumbnailFile],
  );

  const handleFormikField = (value: string | null | number, id: string) =>
    formik.handleChange({ target: { id, value } });

  const handleEducationEditChange = (field: string) => (value: string) => {
    setEducationFormTouched(true);
    if (field === 'start_year' || field === 'graduation_year') {
      educationFormik.handleChange({ target: { id: field, value: Number(value) } });
      return;
    }
    educationFormik.handleChange({ target: { id: field, value } });
  };

  const handleAddEducation = async () => {
    const errors = await educationFormik.validateForm();
    if (Object.keys(errors).length > 0) {
      setEducationFormTouched(false);
      return;
    }
    // edit case
    if (educationIndexForEdit !== null) {
      const copyEducations = JSON.parse(JSON.stringify(formik.values.education));
      copyEducations[educationIndexForEdit] = { ...educationFormik.values };
      formik.handleChange({
        target: { id: 'education', value: copyEducations },
      });
    } else {
      // add new case
      formik.handleChange({
        target: { id: 'education', value: [...formik.values.education, educationFormik.values] },
      });
    }
    setAddEducationSectionOpen(false);
    setEducationIndexForEdit(null);
    educationFormik.resetForm();
  };

  const handleAddEducationCancel = () => {
    setAddEducationSectionOpen(false);
    setEducationIndexForEdit(null);
    educationFormik.resetForm();
  };

  const handleGenderChange = (arg: string) =>
    formik.handleChange({ target: { id: 'gender', value: arg } });

  const updateSkillSelection = (skillsForUpdate: { item: SkillDTO; checked: boolean }[]) => {
    const newSkills = [...formik.values.skills].filter((item) => {
      const target = skillsForUpdate.find((i) => i.item.id === item.id);
      if (target) {
        if (target.checked) return true;
        return false;
      }
      return true;
    });

    skillsForUpdate.forEach(({ item, checked }) => {
      if (checked) {
        newSkills.push(item);
      }
    });

    newSkills.sort((a, b) => (a.name > b.name ? 1 : -1));

    formik.handleChange({
      target: { id: 'skills', value: newSkills },
    });
  };

  const handleSkillRemove = (skill: SkillDTO) => {
    formik.handleChange({
      target: {
        id: 'skills',
        value: formik.values.skills.filter((selectedSkill) => selectedSkill.name !== skill.name),
      },
    });
  };

  const handleLanguageRemove = (language: { id: number; name: string }) => {
    formik.handleChange({
      target: {
        id: 'language_ids',
        value: [...formik.values.language_ids].filter(
          (selectedLanguageId) => selectedLanguageId !== language.id,
        ),
      },
    });
  };

  const updateManyLanguages = (languagesForUpdate: { item: SimpleType; checked: boolean }[]) => {
    const newLanguages = [...formik.values.language_ids].filter((item) => {
      const target = languagesForUpdate.find((i) => i.item.id === item);
      if (target) {
        if (target.checked) return true;
        return false;
      }
      return true;
    });

    languagesForUpdate.forEach(({ item, checked }) => {
      if (checked) {
        newLanguages.push(item.id);
      }
    });

    languagesForUpdate.sort((a, b) => (a > b ? 1 : -1));

    formik.handleChange({
      target: { id: 'language_ids', value: newLanguages },
    });
  };

  const handleEditEducation = (i: number) => () => {
    const educationForEdit = formik.values.education[i];
    educationFormik.setValues(educationForEdit);
    setAddEducationSectionOpen(true);
    setEducationIndexForEdit(i);

    const scrollTarget = document.getElementById('education_scroll_target');
    scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
  };

  const handleRemoveAddedEducation = () => {
    if (educationIndexForEdit === null) return;
    const previousValues = JSON.parse(JSON.stringify(formik.values.education)) as EducationDTO[];
    previousValues[educationIndexForEdit]._destroy = true;

    formik.handleChange({
      target: {
        id: 'education',
        value: previousValues,
      },
    });
    setEducationIndexForEdit(null);
    setAddEducationSectionOpen(false);
    educationFormik.resetForm();
  };

  const handleCertificateAction = async (dto: Partial<CertificateDTO>) => {
    const prevInitialValues = mapDtoToValues(defaults, myProfileInfo);
    const prevValues = deepCompare(prevInitialValues, formik.values);

    const response = await dispatch(updateMyProfileAsync({ certificates: [dto] }));
    const { certificates } = unwrapResult(response);

    const initialValues = mapDtoToValues(defaults, myProfileInfo);
    initialValues.certificates = certificates;
    formik.resetForm({ values: initialValues });

    Object.entries(prevValues as { [key: string]: unknown }).forEach(([key, value]) => {
      formik.setFieldValue(key, value);
    });
  };

  const formDirty =
    formik.dirty ||
    !isTimezoneCorrect ||
    isThumbnailChanged ||
    isIntroVideoChanged ||
    isVideoThumbnailChanged;

  return (
    <Page title="My Profile">
      {formDirty && (
        <SaveBar
          onConfirm={() => submitWithValidation()}
          onDiscard={discardChanges}
          isLoading={profileUpdateLoading}
        />
      )}
      <div className={styles.divider} style={{ marginBottom: 30 }} />
      <div className="single-item-page labels">
        <Layout>
          <Layout.Section>
            <Card title="Professional ID">
              <Card.Section>
                <div className="aboutSection--overload">
                  <ProfessionalID
                    formik={formik}
                    handleFormikField={handleFormikField}
                    loading={profileUpdateLoading}
                  />
                </div>
              </Card.Section>
            </Card>
            <Card>
              <Card.Header title="Intro video">
                {introVideoFile && !profileUpdateLoading && (
                  <Button onClick={removeIntroVideo} plain>
                    Remove video
                  </Button>
                )}
              </Card.Header>
              <Card.Section>
                <div id="videoFile">
                  <IntroVideo
                    video={introVideoFile}
                    thumbnail={videoThumbnailFile}
                    onVideoDrop={handleIntroVideoDrop}
                    onThumbnailDrop={handleIntroThumbnailDrop}
                    loading={videoLoading}
                  />
                </div>
              </Card.Section>
            </Card>
            <Card>
              <Card.Header title="Education">
                {!addEducationSectionOpen && (
                  <div className={styles.myProfile__addButton}>
                    <Button onClick={() => setAddEducationSectionOpen(true)}>Add</Button>
                  </div>
                )}
              </Card.Header>
              <Card.Section>
                <div id="education_scroll_target" />
                {addEducationSectionOpen && (
                  <FormLayout>
                    <FormLayout.Group>
                      <TextField
                        label="Degrees"
                        placeholder="e.g. Bachelor's degree"
                        value={educationFormik.values.degree}
                        onChange={handleEducationEditChange('degree')}
                        error={
                          educationFormik.errors.degree && !educationFormTouched
                            ? educationFormik.errors.degree
                            : false
                        }
                        disabled={profileUpdateLoading}
                        autoComplete={false}
                      />
                      <TextField
                        label="Fields of study"
                        placeholder="e.g. Psychology"
                        onChange={handleEducationEditChange('major')}
                        value={educationFormik.values.major}
                        error={
                          educationFormik.errors.major && !educationFormTouched
                            ? educationFormik.errors.major
                            : false
                        }
                        disabled={profileUpdateLoading}
                        autoComplete={false}
                      />
                    </FormLayout.Group>
                    <FormLayout.Group>
                      <TextField
                        label="University / college"
                        placeholder="e.g. Tel - Aviv university"
                        value={educationFormik.values.college}
                        onChange={handleEducationEditChange('college')}
                        error={
                          educationFormik.errors.college && !educationFormTouched
                            ? educationFormik.errors.college
                            : false
                        }
                        disabled={profileUpdateLoading}
                        autoComplete={false}
                      />
                      <div className={styles.myProfile__educationContainer}>
                        <div className={styles.myProfile__educationSubContainer}>
                          <EducationYearsPopover
                            selectedYear={educationFormik.values.start_year}
                            handleYearSelect={handleEducationEditChange('start_year')}
                            label="Start date"
                            error={
                              educationFormik.errors.start_year && !educationFormTouched
                                ? educationFormik.errors.start_year
                                : false
                            }
                            disabled={profileUpdateLoading}
                          />
                        </div>
                        <div className={styles.myProfile__educationSubContainer}>
                          <EducationYearsPopover
                            selectedYear={educationFormik.values.graduation_year}
                            handleYearSelect={handleEducationEditChange('graduation_year')}
                            label="End date"
                            error={
                              educationFormik.errors.graduation_year && !educationFormTouched
                                ? educationFormik.errors.graduation_year
                                : false
                            }
                            disabled={profileUpdateLoading}
                          />
                        </div>
                      </div>
                    </FormLayout.Group>
                    <div className={styles.myProfile__educationActionButtons}>
                      <div>
                        {educationIndexForEdit !== null && (
                          <Button outline destructive onClick={handleRemoveAddedEducation}>
                            Remove
                          </Button>
                        )}
                      </div>
                      <div>
                        {formik.values.education.length > 0 && (
                          <Button onClick={handleAddEducationCancel}>Cancel</Button>
                        )}
                        <Button onClick={handleAddEducation}>Save</Button>
                      </div>
                    </div>
                    {formik.values.education.length > 0 && <div className={styles.divider} />}
                  </FormLayout>
                )}
                <div id="educations" className={styles.myProfile__educationsBlock}>
                  {formik.values.education.map((education, i) => {
                    if (education._destroy) return <></>;
                    return (
                      <div
                        key={`${education}${i}`}
                        className={styles.myProfile__educationsEditButtonContainer}
                      >
                        <div className={styles.myProfile__educationsEditButton}>
                          <TextStyle variation="subdued">{`${education.start_year} – ${education.graduation_year}`}</TextStyle>
                          <div>
                            <Button plain onClick={handleEditEducation(i)}>
                              Edit
                            </Button>
                          </div>
                        </div>
                        <div>{`${education.degree} – ${education.major}`}</div>
                        <div>{`${education.college}`}</div>

                        {i !== formik.values.education.length - 1 && (
                          <div className={styles.divider} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card.Section>
            </Card>
            <Card title="Skills">
              <Card.Section>
                <MultySelectPopover
                  items={skills}
                  selected={formik.values.skills}
                  onItemRemove={handleSkillRemove}
                  addManyItems={updateSkillSelection}
                  placeholder="Choose your main skills"
                  disabled={profileUpdateLoading}
                />
              </Card.Section>
            </Card>
            <Card sectioned>
              <CertificateForm
                certificates={formik.values.certificates as CertificateDTO[]}
                handleCertificateAction={handleCertificateAction}
              />
            </Card>
            <Card title="Therapy languages">
              <Card.Section>
                <MultySelectPopover
                  items={languages}
                  selected={languages.filter((lang) =>
                    formik.values.language_ids.some((i: number | null) => i === lang.id),
                  )}
                  onItemRemove={handleLanguageRemove}
                  addManyItems={updateManyLanguages}
                  placeholder="Choose the languages you can practice in"
                  suffix
                  disabled={profileUpdateLoading}
                />
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card title="General profile">
              <Card.Section>
                <div className={styles.profilePicture}>
                  <div>Profile Picture</div>
                  <div>
                    {thumbnailFile && (
                      <Button plain onClick={removeThumbnail}>
                        Remove image
                      </Button>
                    )}
                  </div>
                </div>
                <div id="myProfileDropzone" className="DropzoneWithError fileViewWithoutCaption">
                  <div className={styles.dropZoneWrapper}>
                    <DropZone
                      id="thumbnail"
                      onDrop={handleProfileDropZoneDrop}
                      allowMultiple={false}
                      accept="image/*"
                      openFileDialog={openFileDialog}
                      onFileDialogClose={toggleOpenFileDialog}
                      onClick={() => setIsOpenFileUpload(true)}
                    >
                      <FileView
                        buttonText="Add file"
                        imageHint="or drop files to upload"
                        showLimitText={false}
                        file={thumbnailFile}
                        validTypes={validImageTypes}
                        size={{ w: 400, h: 400 }}
                        loading={photoLoading}
                      />
                    </DropZone>
                  </div>
                </div>
                <div className={styles.myProfile__textFields}>
                  <TextField
                    type="text"
                    label="First Name"
                    id="first_name"
                    onChange={handleTextFieldChange}
                    value={formik.values.first_name}
                    error={formik.touched.first_name && formik.errors.first_name}
                    disabled={profileUpdateLoading}
                  />
                  <TextField
                    type="text"
                    label="Last Name"
                    id="last_name"
                    onChange={handleTextFieldChange}
                    value={formik.values.last_name}
                    disabled={profileUpdateLoading}
                    error={formik.touched.last_name && formik.errors.last_name}
                  />
                  <TextField
                    type="email"
                    label="Email"
                    id="email"
                    onChange={handleTextFieldChange}
                    value={myProfileInfo?.email}
                    disabled
                  />
                  <AutocompleteList
                    label="Country"
                    placeholder="Select your country"
                    fieldId="country_id"
                    selected={formik.values.country_id}
                    options={countriesForSelect}
                    disabled={profileUpdateLoading}
                    onSelect={handleTextFieldChange}
                  />
                  <AutocompleteList
                    label="State"
                    placeholder="Select your state"
                    fieldId="state_id"
                    selected={formik.values.state_id}
                    options={statesForSelect}
                    disabled={profileUpdateLoading}
                    onSelect={handleTextFieldChange}
                  />
                  <TextField
                    id="phone_number"
                    value={formik.values.phone_number.replace(onlyCharRegEx, '')}
                    label="Phone number"
                    placeholder="Enter your phone number"
                    onChange={handleTextFieldChange}
                    error={formik.touched.phone_number && formik.errors.phone_number}
                  />
                  <BeautySelect
                    label="Gender"
                    id="gender"
                    options={genders}
                    onChange={handleGenderChange}
                    value={formik.values.gender}
                    placeholder="Select your gender"
                    disabled={profileUpdateLoading}
                    useExternalLabels
                  />
                  <AutocompleteList
                    label="Language"
                    placeholder="Select regional format"
                    fieldId="primary_language_id"
                    selected={formik.values.primary_language_id}
                    options={languagesForSelect}
                    disabled={profileUpdateLoading}
                    onSelect={handleTextFieldChange}
                  />
                  <AutocompleteList
                    label="Time zone"
                    placeholder="Select time zone"
                    fieldId="time_zone_id"
                    selected={formik.values.time_zone_id}
                    options={timezones}
                    disabled={profileUpdateLoading}
                    onSelect={handleTextFieldChange}
                  />
                </div>
              </Card.Section>
            </Card>
            <CropImageModal
              isOpenModal={isOpenFileUpload}
              uploadCroppedImage={handleChangeThumbnail}
              closeModal={() => setIsOpenFileUpload(false)}
              aspectRatio={1}
              removeFileTitle="remove image"
              removeFile={() => removeThumbnail()}
              accept="image/*"
            />

            <CropImageModal
              isOpenModal={isOpenIntroVideoFileUpload}
              uploadCroppedImage={handleChangeThumbnail}
              closeModal={() => setIsOpenIntroVideoFileUpload(false)}
              aspectRatio={1}
              removeFileTitle="remove video"
              removeFile={() => removeIntroVideo()}
              accept="video/*"
            />
          </Layout.Section>
        </Layout>
        <div className={styles.divider} />
        <div className={styles.myProfile__saveButtonContainer}>
          <Button primary onClick={submitWithValidation}>
            Save
          </Button>
        </div>
      </div>
    </Page>
  );
}
