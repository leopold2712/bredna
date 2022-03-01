import React from 'react';
import { Button, TextField } from '@shopify/polaris';
import type { FormikState } from 'formik';
import type { NoticeFormik } from './types/NoticeFormik';
import FileDropzone from '../../FileDropZone';

import styles from '../styles.module.scss';

export type Props = {
  formik: FormikState<NoticeFormik>;
  submitForm: () => void;
  loading: boolean;
  handleFormikField: (value: string | boolean | number, id: string) => void;
  files: File[];
  addFiles: (acceptedFiles: File[]) => void;
  deleteFile: (fileName: string) => void;
};

export const SendEmailForm = ({
  formik,
  submitForm,
  handleFormikField,
  files,
  addFiles,
  deleteFile,
  loading,
}: Props): JSX.Element => (
  <div className={styles.noticeContainer__subContainer}>
    <div className="fs-mask">
      <TextField
        label="Subject"
        id="subject"
        value={formik.values.subject}
        onChange={handleFormikField}
        error={formik.touched.subject && formik.errors.subject}
      />
    </div>
    <div className={styles.noticeContainer__subContainer__block}>
      <div className="live-session__text-field-overload fs-mask">
        <TextField
          label="Message"
          id="message"
          onChange={handleFormikField}
          value={formik.values.message}
          error={formik.touched.message && formik.errors.message}
          multiline={3}
          placeholder="Example: Please review the questions file I have sent before our next session"
        />
      </div>
    </div>
    <div className={styles.noticeContainer__subContainer__block}>
      <div className={styles.files}>
        <p className={styles.noticeContainer__subContainer__fileHeader}>Files</p>
        <div className="fs-mask">
          <FileDropzone
            files={files}
            setFiles={addFiles}
            deleteFile={deleteFile}
            title="Add files"
            subtitle="or drop files to upload"
          />
        </div>
      </div>
    </div>

    <div className={styles.sendButtonContainer}>
      <div className={styles.sendButtonContainer__button}>
        <Button primary onClick={submitForm} loading={loading}>
          Send
        </Button>
      </div>
    </div>
  </div>
);
