import React, { useCallback, useEffect, useState } from 'react';
import { Button, DropZone, FormLayout, InlineError, TextField } from '@shopify/polaris';
import { useFormik, FormikTouched, setNestedObjectValues } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '../../../../../../main/store/hooks';
import type { CertificateModel } from '../../models';
import { addCertificate, editCertificate, removeCertificate } from '../../store';
import { toggleSaveIndicator } from '../../../../store';
import FileView, { PictureType } from '../../../../../../shared/components/FileView';
import { AttachedFile } from '../AttachedFile';
import { CertificateDTO } from '../../../../../../shared/dtos/certificate.dto';
import { checkIsMobile } from '../../../../../../shared/utils';
import { getFileLink } from '../../../../../MyProfile/store/actions/getFileLink';
import { validImageTypes } from '../../../../../../shared/constants/dropzoneValidTypes';
import { validateDropZone } from '../../../../../../shared/utils/validateDropZone';

import styles from './certificateForm.module.scss';
import './certificateForm.overload.scss';

interface IProps {
  certificate?: CertificateModel;
  certificates: CertificateDTO[];
  closeCertificate: () => void;
}

export const CertificateForm: React.FC<IProps> = ({
  certificate,
  certificates,
  closeCertificate,
}: IProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [thumbnailFile, setThumbnailFile] = useState<PictureType>(certificate?.fileSource);
  const [thumbnailSizeError, setThumbnailSizeError] = useState(false);
  const [isOpenFileUpload, setIsOpenFileUpload] = useState(false);

  const formik = useFormik<CertificateModel>({
    initialValues: {
      id: certificate ? certificate.id : '',
      title: certificate ? certificate.title : '',
      subtitle: certificate ? certificate.subtitle : '',
      thumbnail: certificate ? certificate.thumbnail : '',
      fileSource: certificate ? certificate.fileSource : '',
      fileName: certificate ? certificate.fileName : '',
      deleted: false,
    },
    validationSchema: yup.object().shape({
      title: yup.string().required('This is a required field'),
      subtitle: yup.string().required('This is a required field'),
    }),
    onSubmit: async (values, formikHelpers) => {
      try {
        let thumbnailLink: string | undefined = '';

        if (thumbnailFile === values.thumbnail) {
          const pos = values.thumbnail?.lastIndexOf('/');
          thumbnailLink = values.thumbnail?.slice(pos && pos + 1);
        } else {
          const { payload: profileFileLink } =
            thumbnailFile && typeof thumbnailFile !== 'string'
              ? await dispatch(getFileLink({ file: thumbnailFile as File, param: 'image' }))
              : { payload: undefined };
          thumbnailLink = profileFileLink as string;
        }

        values.thumbnail = thumbnailFile !== null ? thumbnailLink : '';

        if (values.id) dispatch(editCertificate(values));
        else dispatch(addCertificate(values));

        formikHelpers.resetForm({ values });
      } catch (e) {
        console.log(e);
      }
    },
    enableReinitialize: true,
  });

  const uploadCroppedFile = (file: File) => {
    // cloudinary limitation for uploaded pictures
    if (file.size < 10000000) {
      setThumbnailFile(file);
      setThumbnailSizeError(false);
    } else {
      setThumbnailSizeError(true);
    }
  };

  const toggleOpenFileDialog = useCallback(() => {
    setIsOpenFileUpload(!isOpenFileUpload);
  }, [isOpenFileUpload]);

  const handleProfileDropZoneDrop = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    if (validateDropZone(_dropFiles, acceptedFiles, validImageTypes))
      uploadCroppedFile(acceptedFiles[0]);
  }, []);

  const formFieldHandler = useCallback((value, id) => {
    formik.handleChange({ target: { id, value } });
  }, []);

  const onClickSave = useCallback(async () => {
    const errors = await formik.validateForm();
    if (!Object.keys(errors).length) {
      formik.handleSubmit();
      closeCertificate();
    } else {
      formik.setTouched(setNestedObjectValues<FormikTouched<CertificateModel>>(errors, true));
    }
  }, []);

  const onClickCancel = useCallback(() => {
    if (formik.dirty) {
      formik.resetForm();
    }
    closeCertificate();
  }, []);

  const onClickRemove = useCallback(() => {
    if (formik.dirty) {
      formik.resetForm();
    }
    if (certificate) dispatch(removeCertificate(certificate));
    closeCertificate();
  }, []);

  useEffect(() => {
    setThumbnailFile(certificate?.fileSource);
  }, [certificate?.fileSource]);

  useEffect(() => {
    const fileSource =
      (thumbnailFile &&
        typeof thumbnailFile === 'object' &&
        window.URL.createObjectURL(thumbnailFile)) ||
      certificate?.thumbnail ||
      null;
    formik.values.fileSource = fileSource || undefined;

    const fileName =
      // @ts-ignore
      thumbnailFile?.name || null;
    formik.values.fileName = fileName || undefined;
  }, [thumbnailFile]);

  useEffect(() => {
    dispatch(toggleSaveIndicator(false));
  }, [formik.errors]);

  return (
    <div>
      <FormLayout>
        <FormLayout.Group>
          <TextField
            id="title"
            name="title"
            label="Title"
            placeholder="Psychology certificate e.g."
            value={formik.values.title}
            error={formik.touched.title && formik.errors.title}
            onChange={formFieldHandler}
            onFocus={() => null}
          />
          <TextField
            id="subtitle"
            name="subtitle"
            label="Issuing organization"
            placeholder="Yale university e.g."
            value={formik.values.subtitle}
            error={formik.touched.subtitle && formik.errors.subtitle}
            onChange={formFieldHandler}
            onFocus={() => null}
          />
        </FormLayout.Group>
      </FormLayout>
      <div className={styles.certificateContainer}>
        <div className={styles.certificateSubContainer}>
          <div
            className={`${
              formik.touched.thumbnail && !!formik.errors.thumbnail && checkIsMobile()
                ? 'DropzoneWithError'
                : ''
            }`}
          >
            <div className="complete-profile-drop-zone fileViewWithoutCaption">
              <DropZone
                onDrop={handleProfileDropZoneDrop}
                allowMultiple={false}
                accept="image/*"
                openFileDialog={isOpenFileUpload}
                onFileDialogClose={toggleOpenFileDialog}
                onClick={toggleOpenFileDialog}
              >
                <FileView
                  file={thumbnailFile}
                  validTypes={validImageTypes}
                  buttonText="Add file"
                  imageHint="or drop files to upload"
                  videoHint="or drop files to upload"
                />
              </DropZone>
              {!thumbnailFile && formik.isSubmitting && (
                <InlineError
                  fieldID="image-wrapper"
                  message="You haven't uploaded the image thumbnail"
                />
              )}
              {thumbnailSizeError && (
                <InlineError
                  fieldID="image-wrapper"
                  message="The uploaded image must be less than 10MB"
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.attachedFilesContainer}>
          <div>Attached files</div>
          <div className={styles.attachedFilesSubContainer}>
            <div>
              {certificates.map((cert) => (
                <AttachedFile file={cert.title} />
              ))}
              {/* @ts-ignore */}
              {thumbnailFile && <AttachedFile file={thumbnailFile?.name || ''} />}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.certificatesActionsContainer}>
        <div>
          <Button outline destructive onClick={onClickRemove}>
            Remove
          </Button>
        </div>
        <div className={styles.certificatesActionsContainer__subcontainer}>
          <div className={styles.actionButtons} style={{ marginRight: 5 }}>
            <Button onClick={onClickCancel}>Cancel</Button>
          </div>
          <div className={styles.actionButtons}>
            <Button onClick={onClickSave}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
