import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Card } from '@shopify/polaris';
import * as yup from 'yup';
import type { NoticeFormik } from '../../../../../../shared/components/Notices/Notice/types/NoticeFormik';
import { SendEmailForm } from '../../../../../../shared/components/Notices/Notice';
import { SectionTitle } from '../../../../components/SectionTitle';
import { NoticeHistory } from '../../../../../../shared/components/Notices/NoticeHistory';
import { selectClientInfo } from '../../../../store/selectors';
import { useAppSelector } from '../../../../../../main/store/hooks';
import { useAppDispatch } from '../../../../../../main/store';
import { getClientNotices, sendMessage } from '../../../../../OneToOneSession/store/actions';
import { uploadDocuments } from '../../../../../../shared/utils';
import HeyToast from '../../../../../../shared/components/HeyToast';
import { SectionLoading } from '../../../../components';

import styles from '../../styles.module.scss';

const validationSchema = yup.object().shape({
  subject: yup.string().required('This is a required field'),
  message: yup.string().required('This is a required field'),
});

export const EmailTab = (): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);
  const [noticeLoading, setNoticeLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);

  const dispatch = useAppDispatch();

  const client = useAppSelector(selectClientInfo);

  const formik = useFormik<NoticeFormik>({
    initialValues: {
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setNoticeLoading(true);
      try {
        let attachments;
        if (files.length > 0) {
          attachments = await uploadDocuments(files);
        }
        const { subject, message } = values;
        const dto = {
          subject,
          body: message,
          client_ids: [client.id],
          ...(files.length && {
            attachments: attachments as string[],
          }),
        };
        await dispatch(sendMessage(dto));
        HeyToast.show({ text: 'Sended successfully' });
        formik.resetForm();
        setFiles([]);
      } catch (err) {
        HeyToast.show({ text: err.message, isError: true });
      } finally {
        await dispatch(getClientNotices({ id: client.id, page: 1 }));
        setNoticeLoading(false);
      }
    },
  });

  const initialLoading = async () => {
    await dispatch(getClientNotices({ id: client.id, page: 1 }));
    setListLoading(false);
  };

  const addFiles = useCallback(
    (acceptedFiles) => {
      setFiles((prev) => prev.concat(acceptedFiles));
    },
    [files],
  );

  const deleteFile = useCallback(
    (fileName: string) => {
      setFiles((prev) => prev.filter((f) => f.name !== fileName));
    },
    [files],
  );

  const handleFormikField = (value: string | boolean | number, id: string) =>
    formik.handleChange({ target: { id, value } });

  useEffect(() => {
    initialLoading();
  }, []);

  return (
    <div>
      <SectionTitle>Email client</SectionTitle>

      <Card sectioned>
        <h1 className={styles.emailTitle}>Notice</h1>
        <p className={styles.emailSubtitle}>
          Enable to send an email to client referring to live session
        </p>
        <SendEmailForm
          formik={formik}
          submitForm={formik.handleSubmit}
          handleFormikField={handleFormikField}
          files={files}
          addFiles={addFiles}
          deleteFile={deleteFile}
          loading={noticeLoading}
        />
      </Card>

      <SectionTitle paddingTop>Email history</SectionTitle>

      <div className={styles.noticesList}>
        {listLoading ? <SectionLoading /> : <NoticeHistory client={client} />}
      </div>
    </div>
  );
};
