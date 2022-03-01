import React, { useCallback, useState } from 'react';
import { Button, DropZone, FormLayout, Icon, TextField } from '@shopify/polaris';
import { MobilePlusMajor, TimelineAttachmentMajor } from '@shopify/polaris-icons';
import { useFormik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { getFileLink } from '../../../../feature/MyProfile/store/actions/getFileLink';
import { useAppDispatch } from '../../../../main/store';
import { validateDropZone } from '../../../utils/validateDropZone';

import type { CertificateDTO } from '../../../dtos/certificate.dto';
import { emptyCertificate } from '../constants/emptyCertificate';
import { validImageTypes } from '../../../constants/dropzoneValidTypes';
import { certificateFormSchema } from '../constants/validationSchema';

import FileView, { PictureType } from '../../FileView';
import { CertificateItem } from '../CertificateItem';

import styles from './styles.module.scss';

const validDropZoneTypes: string[] = [...validImageTypes, 'application/pdf'];

type Props = {
  certificates: CertificateDTO[];
  handleCertificateAction: (dto: Partial<CertificateDTO>) => void;
};

export const CertificateForm = ({ certificates, handleCertificateAction }: Props): JSX.Element => {
  const [certificateFormForEditOpen, setCertificateFormForEditOpen] = useState(false);
  const [certificateForEditFormTouched, setCertificateForEditFormTouched] = useState(false);
  const [certificateFileForEdit, setCertificateFileForEdit] = useState<PictureType>('');
  const [fileTouched, setFileTouched] = useState(false);
  const [isOpenCertificateForEditFileUpload, setIsOpenCertificateForEditFileUpload] = useState(
    false,
  );
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null | undefined>(null);

  const dispatch = useAppDispatch();

  const getFile = async (certificateFile?: string | null) => {
    if (fileTouched) {
      const response = await dispatch(
        getFileLink({
          file: certificateFileForEdit as File,
          param: 'image',
        }),
      );

      return unwrapResult(response);
    }
    if (!certificateFile) return '';
    if (typeof certificateFile === 'string' && certificateFile.length > 0)
      return certificateFile.slice(certificateFile.lastIndexOf('/') + 1);

    return '';
  };

  const certificateFormik = useFormik<CertificateDTO>({
    initialValues: emptyCertificate,
    validationSchema: certificateFormSchema,
    onSubmit: async (values, formikHelpers) => {
      setLoading(true);
      const file = await getFile(values.file);
      const dto: CertificateDTO = {
        ...values,
        file,
      };

      await handleCertificateAction(dto);

      setCertificateFileForEdit(null);
      setFileTouched(false);
      setCertificateForEditFormTouched(false);
      setCertificateFormForEditOpen(false);
      setLoading(false);
      formikHelpers.resetForm();
    },
  });

  const handleChangeCertificateThumbnailForEdit = (file: File) => {
    setFileTouched(true);
    setCertificateFileForEdit(file);
  };

  const handleCertificateForEditChangeDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      if (validateDropZone(_dropFiles, acceptedFiles, validDropZoneTypes))
        handleChangeCertificateThumbnailForEdit(acceptedFiles[0]);
    },
    [],
  );

  const discardFile = () => {
    setFileTouched(true);
    setCertificateFileForEdit(null);
  };

  const handleAddCertificateClick = () => setCertificateFormForEditOpen(true);

  const toggleOpenCertificateForEditFileDialog = useCallback(() => {
    setIsOpenCertificateForEditFileUpload(!isOpenCertificateForEditFileUpload);
  }, [isOpenCertificateForEditFileUpload]);

  const handleCertificateForEditFieldChange = (field: string) => (value: string) => {
    setCertificateForEditFormTouched(true);
    certificateFormik.handleChange({ target: { id: field, value } });
  };

  const handleCancelCertificateForEdit = () => {
    certificateFormik.resetForm();
    setCertificateFormForEditOpen(false);
    setCertificateFileForEdit(null);
    setFileTouched(false);
  };

  const handleEditCertificate = (id?: number) => () => {
    const certificateForEdit = certificates.find((c) => c.id === id);
    if (certificateForEdit) {
      certificateFormik.setValues(certificateForEdit);
      setCertificateFileForEdit(certificateForEdit.file);
    }

    setCertificateFormForEditOpen(true);
  };

  const deleteCertificate = (id?: number) => async () => {
    setDeleteLoading(id);
    await handleCertificateAction({
      id,
      title: certificateFormik.values.title,
      description: certificateFormik.values.description,
      _destroy: true,
    });
    setDeleteLoading(null);
    handleCancelCertificateForEdit();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Certificates</h1>
        {!certificateFormForEditOpen && (
          <div className={styles.addButton}>
            <Button onClick={handleAddCertificateClick}>Add</Button>
          </div>
        )}
      </div>
      <div className={styles.form}>
        {certificateFormForEditOpen && (
          <div className={styles.formWrapper}>
            <div className={styles.divider} />
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
            <div className={styles.certificateContainer}>
              <div className={styles.certificateSubContainer}>
                <div id="certificateDropZone" className="DropzoneWithError fileViewWithoutCaption">
                  <DropZone
                    id="certificateThumbnail"
                    onDrop={handleCertificateForEditChangeDropZoneDrop}
                    allowMultiple={false}
                    accept={validDropZoneTypes.join(', ')}
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
              <div className={styles.attachedFilesContainer}>
                <div className={styles.subContainer}>
                  {certificateFileForEdit && (
                    <div className={styles.item}>
                      <div className={styles.nameContainer}>
                        <span className={styles.name}>
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

                      <div
                        className={styles.icon}
                        role="button"
                        tabIndex={0}
                        onKeyDown={() => null}
                        onClick={discardFile}
                      >
                        <Icon source={MobilePlusMajor} color="base" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.certificatesActionsContainer}>
              <div>
                {certificateFormik.values.id && (
                  <Button
                    outline
                    destructive
                    onClick={deleteCertificate(certificateFormik.values.id)}
                    loading={deleteLoading !== null}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <div className={styles.subcontainer}>
                <div className={styles.actionButtons}>
                  <Button onClick={handleCancelCertificateForEdit} outline>
                    Cancel
                  </Button>

                  <Button onClick={certificateFormik.handleSubmit} loading={loading}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {certificates.filter((c) => !c._destroy).length > 0 && <div className={styles.divider} />}

        {certificates.map((certificate, index) => {
          if (certificate._destroy) return <></>;
          return (
            <CertificateItem
              certificate={certificate}
              index={index}
              totalLength={certificates.length}
              handleEditCertificate={handleEditCertificate}
              deleteCertificate={deleteCertificate}
              deleteLoading={deleteLoading}
            />
          );
        })}
      </div>
    </div>
  );
};
