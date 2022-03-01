import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Card } from '@shopify/polaris';

import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../../../../main/store/hooks';
import { addJourneyNoteAsync } from '../../../../store/actions/addJourneyNoteAsync';
import { selectClientInfo, selectClientJourneys } from '../../../../store/selectors';
import { patchNoteAsync } from '../../../../store/actions/patchNoteAsync';
import { getClientJourneysAsync } from '../../../../store/actions/getClientJourneysAsync';
import { setJourneys } from '../../../../store';

import type { JourneyDTO } from '../../../../dtos/journey.dto';
import { editorConfig } from '../../../../../../shared/constants';
import { NodeType } from '../../../../dtos/nodeType.dto';

import { SectionTitle, EditNoteModal, NoteList, SectionLoading } from '../../../../components';
import { EditorTitle } from '../../../../../../shared/components/EditorTitle';
import ListPagination from '../../../../../../shared/components/Pagination';
import HeyToast from '../../../../../../shared/components/HeyToast';

import styles from '../../styles.module.scss';

export const JourneyTab: React.FC = (): JSX.Element => {
  const client = useAppSelector(selectClientInfo);
  const { list, pagination, loading } = useAppSelector(selectClientJourneys);

  const dispatch = useAppDispatch();

  const [openEditNoteModal, setOpenEditNoteModal] = useState(false);
  const [value, setValue] = useState<string>('');
  const [editorValue, setEditorValue] = useState('');
  const [addNoteLoading, setAddNoteLoading] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<JourneyDTO | null>(null);
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteId, setNoteId] = useState<number | null>(null);

  const initialLoading = async () => {
    await dispatch(getClientJourneysAsync({ id: client.id, page: 1 }));
  };

  const handleOpenEditNoteModal = (journey: JourneyDTO, editValue: string, id: number) => {
    setValue(editValue);
    setSelectedJourney(journey);
    setOpenEditNoteModal(true);
    setNoteId(id);
  };

  const updateJourneys = (newJourney: JourneyDTO) => {
    const updatedList = list.map((j) => {
      if (newJourney.id === j.id) return newJourney;
      return j;
    });

    dispatch(setJourneys(updatedList));
  };

  const toggleModal = (isOpen: boolean) => {
    setOpenEditNoteModal(isOpen);
  };

  const handleNoteChange = (noteText: string) => {
    setValue(noteText);
  };

  const handleSubmitNote = async () => {
    setAddNoteLoading(true);
    if (editorValue.length > 0) {
      const response = await dispatch(
        addJourneyNoteAsync({
          id: client.id,
          note: editorValue,
        }),
      );
      const data = unwrapResult(response);
      updateJourneys(data);
      dispatch(getClientJourneysAsync({ id: client.id, page: 1 }));
      setEditorValue('');
    } else {
      HeyToast.show({ text: 'Note length must be greater than 0', isError: true });
    }

    setAddNoteLoading(false);
  };

  const handleNoteSave = async () => {
    setNoteLoading(true);
    if (value && value.length && selectedJourney) {
      const dto = {
        id: client.id,
        note_id:
          selectedJourney.type === NodeType.Note
            ? selectedJourney.notes[0] && selectedJourney.notes[0].id
            : noteId,
        note: value,
      };

      const { payload } = await dispatch(patchNoteAsync(dto));
      updateJourneys(payload as JourneyDTO);
    }
    setNoteId(null);
    toggleModal(false);
    setNoteLoading(false);
    setSelectedJourney(null);
  };

  const handleNextPage = () => {
    if (pagination['x-next-page'])
      dispatch(getClientJourneysAsync({ id: client.id, page: +pagination['x-next-page'] }));
  };
  const handlePrevPage = () => {
    if (pagination['x-prev-page'])
      dispatch(getClientJourneysAsync({ id: client.id, page: +pagination['x-prev-page'] }));
  };

  useEffect(() => {
    initialLoading();
  }, []);

  return (
    <div>
      <SectionTitle>Current journey</SectionTitle>

      <Card sectioned>
        <EditorTitle count={editorValue.length}>Add new note</EditorTitle>
        <div className="fs-exclude">
          <Editor
            apiKey={process.env.REACT_APP_TINY_MCE_KEY}
            init={editorConfig}
            value={editorValue}
            onEditorChange={setEditorValue}
          />
        </div>
        <div className={styles.submitButton}>
          <Button onClick={handleSubmitNote} loading={addNoteLoading}>
            Submit
          </Button>
        </div>
      </Card>

      <SectionTitle paddingTop>Notes history</SectionTitle>

      <Card sectioned>
        {loading ? (
          <SectionLoading />
        ) : (
          <NoteList list={list} onClickEdit={handleOpenEditNoteModal} />
        )}

        {+pagination['x-total-pages'] > 1 && (
          <ListPagination
            pagination={pagination}
            onNext={handleNextPage}
            onPrevious={handlePrevPage}
          />
        )}
      </Card>

      <EditNoteModal
        value={value}
        isOpen={openEditNoteModal}
        toggleModal={toggleModal}
        onValueChange={handleNoteChange}
        onNoteSave={handleNoteSave}
        loading={noteLoading}
      />
    </div>
  );
};
