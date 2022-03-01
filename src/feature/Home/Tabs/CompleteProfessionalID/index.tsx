/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Button, Card, DropZone, FormLayout, Icon, Stack, TextField } from '@shopify/polaris';
import { MobilePlusMajor, TimelineAttachmentMajor } from '@shopify/polaris-icons';
import { useFormik } from 'formik';
import { useWindowHeight, useWindowWidth } from '@react-hook/window-size';
import * as yup from 'yup';
import { eliminatePolarisCardGap } from '../../utils/hacks';
import { scrollAfterPageChange } from '../../../../shared/utils/scrollAfterPage';

import { useAppSelector, useAppDispatch } from '../../../../main/store/hooks';
import { TabSheets } from '../../constants/TabSheet';
import { setActivePage, toggleSaveIndicator, toggleSkipIndicator } from '../../store';
import { updateTherapistInfo } from './store/actions/updateTherapistInfo';
import { getFileLink } from '../../../MyProfile/store/actions/getFileLink';
import { getSkills } from '../../../../shared/store/meta/selectors';
import { getUser } from '../../../Onboarding/store';
import {
  addCertificate,
  addEducation,
  clearCertificates,
  clearEducations,
  OnboardingState,
} from './store';

import type { EducationModel } from './models';
import type { MyProfileDTO } from '../../../../shared/dtos/myProfile.dto';
import type { UpdateTherapistDTO } from './dtos/updateTherapist.dto';
import type { SkillDTO } from '../../../MyProfile/dto/UpdateMyProfileDTO';
import type { CertificateDTO } from '../../../../shared/dtos/certificate.dto';
import { validImageTypes } from '../../../../shared/constants/dropzoneValidTypes';

import { MultySelectPopover } from '../../../../shared/components/MultyselectList';
import FileView, { PictureType } from '../../../../shared/components/FileView';
import { EducationForm } from './components/EducationForm';
import { EducationItem } from './components/EducationItem';

import styles from './styles/completeProfID.module.scss';
import './styles/completeProfID.overload.scss';
import { validateDropZone } from '../../../../shared/utils/validateDropZone';

type CompleteProfessionalIDModel = {
  skills: SkillDTO[];
  certificates: CertificateDTO[];
};

const emptyCertificate: Partial<CertificateDTO> = {
  title: '',
  description: '',
  file: '',
};

const certificateFormSchema = yup.object().shape({
  title: yup.string().required('Title is required field'),
  description: yup.string().required('Issuing organization is required field'),
});

export const CompleteProfessionalID: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { skipActionIndicator, saveActionIndicator } = useAppSelector((state) => state.home);
  const therapistInfo: MyProfileDTO = useAppSelector(getUser);
  const onboarding: OnboardingState = useAppSelector((state) => state.onboarding);

  const [currentEducation, setCurrentEducation] = useState<EducationModel>();
  const [openEducationForm, setOpenEducationForm] = useState(false);

  const [certificateFormForEditOpen, setCertificateFormForEditOpen] = useState(false);
  const [certificateForEditFormTouched, setCertificateForEditFormTouched] = useState(false);
  const [certificateFileForEdit, setCertificateFileForEdit] = useState<PictureType>('');
  const [isOpenCertificateForEditFileUpload, setIsOpenCertificateForEditFileUpload] = useState(
    false,
  );
  const [certificateIndexForEdit, setCertificateIndexForEdit] = useState<null | number>(null);
  const [touchedCertificates, setTouchedCertificates] = useState<number[]>([]);

  const [skills] = useState<SkillDTO[]>(therapistInfo.skills);
  const [skillsOptions] = useState<SkillDTO[]>(useAppSelector(getSkills));

  const width = useWindowWidth();
  const height = useWindowHeight();

  const formik = useFormik<CompleteProfessionalIDModel>({
    initialValues: {
      skills,
      certificates: [],
    },
    onSubmit: async (values) => {
      const dto: Partial<UpdateTherapistDTO> = {};

      if (values.skills.length) {
        dto.skills = values.skills;
      }

      if (onboarding.educations.length) {
        dto.education = onboarding.educations
          .filter((education) => !(education.id?.startsWith('f') && education.deleted))
          .map((education) => ({
            id: education.id?.startsWith('f') ? undefined : Number(education.id),
            degree: education.degree,
            major: education.major,
            college: education.college,
            start_year: +education.start_year,
            graduation_year: +education.end_year,
            _destroy: education.deleted ? education.deleted : undefined,
          }));
      }

      const resultCertificates = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < values.certificates.length; i++) {
        if (
          touchedCertificates.some((c) => c === values.certificates[i].id) ||
          !values.certificates[i].id
        ) {
          let { file } = values.certificates[i];
          // @ts-ignore
          if (values.certificates[i]?.file instanceof File) {
            const { payload: fileLink } =
              values.certificates[i]?.file && typeof values.certificates[i]?.file !== 'string'
                ? // eslint-disable-next-line no-await-in-loop
                  await dispatch(
                    getFileLink({
                      file: (values.certificates[i]?.file as unknown) as File,
                      param: 'image',
                    }),
                  )
                : { payload: undefined };
            file = fileLink as string;
          }
          if (resultCertificates[i] && resultCertificates[i].id) {
            resultCertificates[i] = { ...values.certificates[i], file: file || '' };
          } else {
            resultCertificates.push({ ...values.certificates[i], file: file || '' });
          }
        }
      }

      dto.certificates = resultCertificates;

      setTouchedCertificates([]);

      await dispatch(updateTherapistInfo(dto));

      dispatch(toggleSaveIndicator(false));
      dispatch(setActivePage(TabSheets.shareYourPage));
    },
  });

  const certificateFormik = useFormik<Partial<CertificateDTO>>({
    initialValues: emptyCertificate,
    validationSchema: certificateFormSchema,
    onSubmit: async (values, formikHelpers) => {
      // do nothing because we need only validation logic
    },
  });

  const loadEducations = async () => {
    await dispatch(clearEducations());
    therapistInfo.education.forEach(async (education) => {
      await dispatch(
        addEducation({
          id: String(education.id),
          degree: education.degree.name,
          major: education.major.name,
          college: education.college.name,
          start_year: String(education.start_year),
          end_year: String(education.graduation_year),
          deleted: false,
        }),
      );
    });
  };

  const handleAddEducation = () => {
    setCurrentEducation(undefined);
    setOpenEducationForm(true);
  };

  const handleEducationEdit = (education: EducationModel) => {
    scrollAfterPageChange();
    setCurrentEducation(education);
    setOpenEducationForm(true);
  };

  const loadCertificates = async () => {
    await dispatch(clearCertificates());
    therapistInfo.certificates.forEach(async (certificate) => {
      await dispatch(
        addCertificate({
          id: String(certificate.id),
          title: certificate.title,
          subtitle: certificate.description,
          fileSource: certificate.file,
          thumbnail: certificate.file,
          deleted: false,
        }),
      );
    });
  };

  const handleCertificateForEditFieldChange = (field: string) => (value: string) => {
    setCertificateForEditFormTouched(true);
    certificateFormik.handleChange({ target: { id: field, value } });
  };

  const handleAddCertificateClick = () => {
    try {
      setTimeout(() => {
        window.resizeTo(width - 1, height);
      }, 100);
    } catch (e) {
      console.log(e);
    }
    setCertificateFormForEditOpen(true);
  };

  const handleChangeCertificateThumbnailForEdit = (file: File) => {
    setCertificateFileForEdit(file);
  };

  const handleCertificateForEditChangeDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      if (validateDropZone(_dropFiles, acceptedFiles, validImageTypes))
        handleChangeCertificateThumbnailForEdit(acceptedFiles[0]);
    },
    [],
  );

  const toggleOpenCertificateForEditFileDialog = useCallback(() => {
    setIsOpenCertificateForEditFileUpload(!isOpenCertificateForEditFileUpload);
  }, [isOpenCertificateForEditFileUpload]);

  const handleRemoveAddedCertificate = () => {
    if (certificateIndexForEdit === null) return;
    const updatedCertificates = JSON.parse(
      JSON.stringify(formik.values.certificates),
    ) as CertificateDTO[];
    const result = updatedCertificates.filter((c, i) => i !== certificateIndexForEdit);
    setCertificateFileForEdit(null);
    setCertificateIndexForEdit(null);
    formik.handleChange({
      target: {
        id: 'certificates',
        value: result,
      },
    });
    certificateFormik.resetForm();
    setCertificateFormForEditOpen(false);
  };

  const handleCancelCertificateForEdit = () => {
    certificateFormik.resetForm();
    setCertificateFormForEditOpen(false);
    setCertificateIndexForEdit(null);
    setCertificateFileForEdit(null);
  };

  const handleSaveCertificate = async () => {
    const errors = await certificateFormik.validateForm();
    if (Object.keys(errors).length > 0) {
      setCertificateForEditFormTouched(false);
      return;
    }
    // edit case
    if (certificateIndexForEdit !== null) {
      const certificateForEdit = formik.values.certificates[certificateIndexForEdit];
      if (certificateForEdit && certificateForEdit.id) {
        const prev = [...touchedCertificates];
        prev.push(certificateForEdit.id);
        setTouchedCertificates(prev);
      }

      const { certificates } = formik.values;
      const editedCertificates = [...certificates];
      editedCertificates[certificateIndexForEdit] = {
        ...certificateFormik.values,
        // @ts-ignore
        file: certificateFileForEdit,
      };
      formik.handleChange({ target: { id: 'certificates', value: editedCertificates } });
      setCertificateIndexForEdit(null);
    } else {
      formik.handleChange({
        target: {
          id: 'certificates',
          value: [
            ...formik.values.certificates,
            {
              title: certificateFormik.values.title,
              description: certificateFormik.values.description,
              file: certificateFileForEdit,
            },
          ],
        },
      });
    }
    certificateFormik.resetForm();
    setCertificateFileForEdit(null);
    setCertificateForEditFormTouched(false);
    setCertificateFormForEditOpen(false);
  };

  const handleEditCertificate = (index: number) => () => {
    const certificateForEdit = formik.values.certificates[index];
    certificateFormik.setValues(certificateForEdit);
    setCertificateFileForEdit(certificateForEdit.file);
    setCertificateFormForEditOpen(true);
    setCertificateIndexForEdit(index);
  };

  const deleteCertificate = (id?: number) => {
    const value = formik.values.certificates.map((c) => {
      if (c.id === id) return { ...c, _destroy: true };
      return c;
    });
    if (id) {
      const touched = [...touchedCertificates];
      touched.push(id);
      setTouchedCertificates(touched);
    }

    formik.handleChange({ target: { id: 'certificates', value } });
  };

  useEffect(() => {
    if (therapistInfo.education) loadEducations();
    if (therapistInfo.certificates) loadCertificates();
  }, [therapistInfo]);

  useEffect(() => {
    if (saveActionIndicator) {
      if (formik.dirty || formik.isValid) {
        formik.handleSubmit();
      } else {
        dispatch(toggleSaveIndicator(false));
        dispatch(setActivePage(TabSheets.shareYourPage));
      }
      return;
    }
    if (skipActionIndicator) {
      dispatch(toggleSkipIndicator(false));
      dispatch(setActivePage(TabSheets.shareYourPage));
    }
  }, [skipActionIndicator, saveActionIndicator]);

  useLayoutEffect(() => {
    eliminatePolarisCardGap();
  }, []);

  const handleSkillRemove = (skill: SkillDTO) => {
    formik.handleChange({
      target: {
        id: 'skills',
        value: formik.values.skills.filter((selectedSkill) => selectedSkill.name !== skill.name),
      },
    });
  };

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

  return (
    <>
      <Card.Section title={<p className={styles.productSubtitle}>Complete professional ID</p>}>
        <FormLayout>
          <p className={styles.description}>
            There is a variety of products available for you to choose from to promote your profile.
            We advise you to start with an event to attract more clients to your therapist page.
          </p>

          <Stack alignment="center" distribution="equalSpacing">
            <p className={styles.sectionTitle}>Education</p>
            {!openEducationForm && (
              <div className={styles.actionButtons}>
                <Button onClick={handleAddEducation}>Add</Button>
              </div>
            )}
          </Stack>

          {openEducationForm && (
            <EducationForm
              education={currentEducation}
              closeEducation={() => setOpenEducationForm(false)}
            />
          )}
          {onboarding.educations
            .filter((item) => !item.deleted)
            .map((item, index) => (
              <EducationItem
                key={item.id}
                index={index}
                education={item}
                editEducation={handleEducationEdit}
              />
            ))}
        </FormLayout>
      </Card.Section>

      <Card.Section title={<p className={styles.skillsTitle}>Skills</p>}>
        <div className={styles.skillsContainer}>
          <MultySelectPopover
            items={skillsOptions}
            selected={formik.values.skills}
            onItemRemove={handleSkillRemove}
            addManyItems={updateSkillSelection}
            placeholder="Choose your main skills"
          />
        </div>
      </Card.Section>

      <Card.Header title="Certificates">
        {!certificateFormForEditOpen && (
          <div className={styles.myProfile__addButton}>
            <Button onClick={handleAddCertificateClick}>Add</Button>
          </div>
        )}
      </Card.Header>
      <Card.Section>
        {certificateFormForEditOpen && (
          <div>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  id="title"
                  label="Title"
                  value={certificateFormik.values.title}
                  onChange={handleCertificateForEditFieldChange('title')}
                  placeholder="Psychology certificate e.g."
                  error={
                    !certificateForEditFormTouched &&
                    certificateFormik.errors.title &&
                    certificateFormik.errors.title
                  }
                />
                <TextField
                  id="description"
                  label="Issuing organization"
                  value={certificateFormik.values.description}
                  onChange={handleCertificateForEditFieldChange('description')}
                  placeholder="e.g. Yael university"
                  error={
                    !certificateForEditFormTouched &&
                    certificateFormik.errors.description &&
                    certificateFormik.errors.description
                  }
                />
              </FormLayout.Group>
            </FormLayout>
            <div className={styles.myProfile__certificateContainer}>
              <div className={styles.myProfile__certificateSubContainer}>
                <div id="certificateDropZone" className="DropzoneWithError fileViewWithoutCaption">
                  <DropZone
                    id="certificateThumbnail"
                    onDrop={handleCertificateForEditChangeDropZoneDrop}
                    allowMultiple={false}
                    accept="*"
                    openFileDialog={isOpenCertificateForEditFileUpload}
                    onFileDialogClose={toggleOpenCertificateForEditFileDialog}
                    onClick={() => setIsOpenCertificateForEditFileUpload(true)}
                  >
                    <FileView
                      buttonText="Add file"
                      imageHint="or drop files to upload"
                      showLimitText={false}
                      file={certificateFileForEdit}
                      validTypes={validImageTypes}
                      size={{ w: 400, h: 400 }}
                    />
                  </DropZone>
                </div>
              </div>
              <div className={styles.myProfile__attachedFilesContainer}>
                <div className={styles.myProfile__attachedFilesContainer__subContainer}>
                  {certificateFileForEdit && (
                    <div className={styles.myProfile__attachedFilesContainer__subContainer__item}>
                      <div
                        className={
                          styles.myProfile__attachedFilesContainer__subContainer__item__nameContainer
                        }
                      >
                        <span
                          className={
                            styles.myProfile__attachedFilesContainer__subContainer__item__name
                          }
                        >
                          <Icon source={TimelineAttachmentMajor} />
                          <span>
                            &nbsp;{' '}
                            {(certificateFileForEdit &&
                              certificateFileForEdit instanceof File &&
                              certificateFileForEdit.name) ||
                              'file'}
                          </span>
                        </span>
                      </div>
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                      <div
                        className={
                          styles.myProfile__attachedFilesContainer__subContainer__item__icon
                        }
                        onClick={() => setCertificateFileForEdit(null)}
                      >
                        <Icon source={MobilePlusMajor} color="base" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.myProfile__certificatesActionsContainer}>
              <div>
                {certificateIndexForEdit !== null && (
                  <Button outline destructive onClick={handleRemoveAddedCertificate}>
                    Remove
                  </Button>
                )}
              </div>
              <div className={styles.myProfile__certificatesActionsContainer__subcontainer}>
                <div className={styles.myProfile__educationActionButtons}>
                  <Button onClick={handleCancelCertificateForEdit} outline>
                    Cancel
                  </Button>

                  <Button onClick={handleSaveCertificate}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {formik.values.certificates.filter((c) => !c._destroy).length > 0 && (
          <div className={styles.divider} />
        )}

        {formik.values.certificates.map((certificate, index) => {
          if (certificate._destroy) return <></>;
          return (
            <div key={`${certificate.title} ${index}`}>
              <div className={styles.myProfile__certificatesEditButton}>
                <Button plain onClick={handleEditCertificate(index)}>
                  Edit
                </Button>
              </div>
              <div>
                <p className={styles.myProfile__certificateName}>{certificate.title}</p>
                <p className={styles.myProfile__certificateNameOrganization}>
                  {certificate.description}
                </p>
              </div>
              <div>
                <div>
                  <div className={styles.myProfile__attachedFilesContainer__subContainer__item}>
                    <div
                      className={
                        styles.myProfile__attachedFilesContainer__subContainer__item__nameContainer
                      }
                    >
                      <span
                        className={
                          styles.myProfile__attachedFilesContainer__subContainer__item__name
                        }
                      >
                        <Icon source={TimelineAttachmentMajor} />
                        <span>
                          &nbsp;
                          {certificate.title}
                        </span>
                      </span>
                    </div>
                    <div
                      className={styles.myProfile__attachedFilesContainer__subContainer__item__icon}
                      onClick={() => deleteCertificate(certificate.id)}
                    >
                      <Icon source={MobilePlusMajor} color="base" />
                    </div>
                  </div>
                </div>
              </div>
              {index !== formik.values.certificates.length - 1 && (
                <div className={styles.divider} />
              )}
            </div>
          );
        })}
      </Card.Section>
    </>
  );
};
