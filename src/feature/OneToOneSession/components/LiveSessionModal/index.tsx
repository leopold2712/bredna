import React, { useCallback, useState, useEffect } from 'react';
import { Button, Heading, Scrollable, Sheet } from '@shopify/polaris';
import { MobileCancelMajor } from '@shopify/polaris-icons';
import moment from 'moment';
import { useFormik } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames';
import { uploadDocuments } from '../../../../shared/utils';
import { useAppSelector, useAppDispatch } from '../../../../main/store/hooks';

import { patchNote, getClientNotices, sendMessage, addNote } from '../../store/actions';
import { getSessionState, selectSessionNotes } from '../../store/selectors';
import { initialValues } from '../../constants/initialValues';
import { clearSession } from '../../store';

import type { NoteDTO } from '../../../../shared/dtos/note.dto';
import type { NoticeFormik } from '../../../../shared/components/Notices/Notice/types/NoticeFormik';

import EditNoteModal, { EditMode } from '../../../../shared/components/EditNodeModal';
import { LiveSessionClientInformation } from './components/ClientInformation';
import { LocalLoader } from '../../../../shared/components/LocalLoader';
import { NoticeHistory } from '../../../../shared/components/Notices/NoticeHistory';
import HeyToast from '../../../../shared/components/HeyToast';
import { SendEmailForm } from '../../../../shared/components/Notices/Notice';
import { SessionLink } from './components/SessionLink';
import { LiveSessionNotes } from './components/Notes';
import { CollapsibleSection } from '../../../../shared/components/CollapsibleSection';

import styles from './styles.module.scss';
import './liveSession.overload.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onEventCancel: () => void;
};

const validationSchema = yup.object().shape({
  subject: yup.string().required('This is a required field'),
  message: yup.string().required('This is a required field'),
});

const LiveSessionModal: React.FC<Props> = ({ isOpen, onClose, onEventCancel }: Props) => {
  const [notes, setNotes] = useState<string[]>([]);
  const [noteForAdding, setNoteForAdding] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [noteForEdit, setNoteForEdit] = useState<NoteDTO>();
  const [isEditNoteOpen, setIsEditNoteOpen] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);
  const [noticeLoading, setNoticeLoading] = useState(false);

  const { data, loading } = useAppSelector(getSessionState);
  const { session } = data || initialValues;
  const { client } = session.participants[0];
  const journey = useAppSelector(selectSessionNotes);

  const dispatch = useAppDispatch();

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

  useEffect(
    () => () => {
      dispatch(clearSession());
    },
    [],
  );

  useEffect(() => {
    if (data && data.session && data.session.notes)
      setNotes(data.session.notes.map((note) => note.body));
    else setNotes([]);
  }, [data]);

  const handleFormikField = (value: string | boolean | number, id: string) =>
    formik.handleChange({ target: { id, value } });

  const handleNoteChange = (value: string) => {
    setNoteForAdding(value);
  };

  const toggleEditNote = () => {
    if (isEditNoteOpen) setNoteForEdit(undefined);
    setIsEditNoteOpen((prev) => !prev);
  };

  const handleEditNote = (id: number) => {
    const note = journey.notes.find((n) => n.id === id);
    if (note) {
      setNoteForEdit(note);
      toggleEditNote();
    }
  };

  const updateOneNote = async (value: string) => {
    if (noteForEdit) {
      setNoteLoading(true);
      const { id } = noteForEdit;
      try {
        await dispatch(patchNote({ clientId: client.id, noteId: id, note: value }));
      } catch {
        HeyToast.show({ text: 'Error occured while patching the note', isError: true });
      } finally {
        setNoteForEdit(undefined);
        setNoteLoading(false);
        setIsEditNoteOpen(false);
      }
    }
  };

  const handleNoteAdd = async () => {
    setNoteLoading(true);
    if (noteForAdding.trim().length === 0) return;

    try {
      await dispatch(
        addNote({
          sessionId: session.id,
          clientId: session.participants[0].id,
          note: noteForAdding,
        }),
      );
      setNotes([...notes, noteForAdding]);
      setNoteForAdding('');
    } catch (err) {
      HeyToast.show({ text: err.message, isError: true });
    }

    setNoteLoading(false);
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

  const copySessionLink = () => {
    if (session.start_link) {
      navigator.clipboard.writeText(session.start_link);
      HeyToast.show({ text: 'Сopied successfully' });
    }
  };

  const disabledCancel = moment(session.end_time) < moment();

  const dividerWithMargins = classNames(styles.divider, styles.bothMargins);

  return (
    <Sheet open={isOpen} onClose={onClose} accessibilityLabel="live-session">
      <Scrollable id="session-1" className={styles.scrollableContainer}>
        <div className={styles.mainContainer}>
          <div>
            <Heading>Live Session</Heading>
            <div>
              <span className={styles.subHeadText}>
                {`
                    ${moment(session.start_time).format('dddd, MMMM DD | h:mma')}-${moment(
                  session.end_time,
                ).format('h:mma')}
                  `}
              </span>
            </div>
          </div>
          <Button accessibilityLabel="Cancel" icon={MobileCancelMajor} onClick={onClose} plain />
        </div>

        <SessionLink link={session.start_link} copySessionLink={copySessionLink} />

        <div className={styles.divider} />

        <LiveSessionClientInformation client={client} />

        <div className={dividerWithMargins} />

        <CollapsibleSection label="Notice">
          <div className={styles.noticeContainer__prompt}>
            Enable to send an email to client referring to live session
          </div>
          <SendEmailForm
            formik={formik}
            submitForm={formik.handleSubmit}
            handleFormikField={handleFormikField}
            files={files}
            addFiles={addFiles}
            deleteFile={deleteFile}
            loading={noticeLoading}
          />
        </CollapsibleSection>

        <div className={dividerWithMargins} />

        <CollapsibleSection label="Notice History">
          <NoticeHistory client={client} />
        </CollapsibleSection>

        <div className={styles.divider} />

        <LiveSessionNotes
          journey={journey}
          handleEditNote={handleEditNote}
          handleNoteChange={handleNoteChange}
          noteForAdding={noteForAdding}
          noteLoading={noteLoading}
          handleNoteAdd={handleNoteAdd}
        />

        <div className={styles.cancelButtonContainer}>
          <div className={styles.cancelButton}>
            <Button onClick={onEventCancel} disabled={disabledCancel}>
              Cancel session
            </Button>
          </div>
        </div>

        {loading && <LocalLoader />}

        <EditNoteModal
          value={noteForEdit?.body}
          mode={EditMode.Edit}
          isOpen={isEditNoteOpen}
          loading={noteLoading}
          toggleModal={toggleEditNote}
          onNoteSave={updateOneNote}
        />
      </Scrollable>
    </Sheet>
  );
};

export default LiveSessionModal;
