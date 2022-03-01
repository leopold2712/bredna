/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { Button, Modal, Stack } from '@shopify/polaris';
import { Editor } from '@tinymce/tinymce-react';
import { editorConfig } from '../../../../shared/constants';

import styles from './editNoteModal.module.scss';

interface IProps {
  value: string | undefined;
  isOpen: boolean;
  loading: boolean;
  toggleModal: (isOpen: boolean) => void;
  onValueChange: (value: string) => void;
  onNoteSave: () => void;
}

export const EditNoteModal: React.FC<IProps> = ({
  value,
  isOpen,
  loading,
  toggleModal,
  onValueChange,
  onNoteSave,
}: IProps): JSX.Element => {
  const handlerSave = () => {
    onNoteSave();
  };

  return (
    <Modal open={isOpen} onClose={() => toggleModal(false)} title="Edit note">
      <Modal.Section>
        <div className="fs-exclude">
          <Editor
            apiKey={process.env.REACT_APP_TINY_MCE_KEY}
            init={editorConfig}
            value={value}
            onEditorChange={(value) => onValueChange(value)}
            onFocus={() => null}
          />
        </div>
      </Modal.Section>

      <Modal.Section>
        <div className={styles.editNote__buttons}>
          <Stack spacing="extraTight">
            <Button onClick={() => toggleModal(false)}>Cancel</Button>
            <Button onClick={handlerSave} primary loading={loading}>
              Save
            </Button>
          </Stack>
        </div>
      </Modal.Section>
    </Modal>
  );
};
