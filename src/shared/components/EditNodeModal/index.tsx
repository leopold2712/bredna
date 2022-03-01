/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Stack } from '@shopify/polaris';
import { Editor } from '@tinymce/tinymce-react';

import { editorConfig } from '../../constants';

import styles from './styles.module.scss';

export enum EditMode {
  Add,
  Edit,
}

type TProps = {
  value: string | undefined;
  mode: EditMode;
  isOpen: boolean;
  loading: boolean;
  toggleModal: (isOpen: boolean) => void;
  onNoteSave: (value: string) => void;
};

const EditNoteModal: React.FC<TProps> = ({
  value,
  mode,
  isOpen,
  loading,
  toggleModal,
  onNoteSave,
}: TProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState('');

  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (value) {
      setCurrentValue(value);
    }
  }, [value, isOpen]);

  const updateValue = (v: string) => setCurrentValue(v);

  const handlerSave = () => {
    onNoteSave(currentValue);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => toggleModal(false)}
      title={mode === EditMode.Edit ? 'Edit note' : 'Add note'}
    >
      <Modal.Section>
        <div className="fs-exclude">
          <Editor
            apiKey={process.env.REACT_APP_TINY_MCE_KEY}
            init={editorConfig}
            initialValue={value}
            onEditorChange={updateValue}
            onFocus={() => null}
            ref={editorRef}
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

export default EditNoteModal;
