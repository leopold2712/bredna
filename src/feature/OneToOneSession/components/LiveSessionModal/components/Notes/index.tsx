/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Button, Collapsible, TextField } from '@shopify/polaris';
import type { JourneyDTO } from '../../../../../../shared/dtos/journey.dto';
import { TimeLineNode } from '../../../../../../shared/components/TimelineNode';
import { CollapseButton } from '../../../../../../shared/components/CollapseButton';

import styles from '../../styles.module.scss';

type Props = {
  journey: JourneyDTO;
  handleEditNote: (id: number) => void;
  handleNoteChange: (value: string) => void;
  noteForAdding: string;
  noteLoading: boolean;
  handleNoteAdd: () => void;
};

export const LiveSessionNotes = ({
  journey,
  handleEditNote,
  handleNoteChange,
  noteForAdding,
  noteLoading,
  handleNoteAdd,
}: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className={styles.noticeContainer}>
      <div className={styles.noticeContainer__subContainer}>
        <CollapseButton label="Notes" isOpen={open} onClick={toggleOpen} />
      </div>
      <Collapsible
        id="notesCollapse"
        open={open}
        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
        expandOnPrint
      >
        <div className={styles.tree}>
          <TimeLineNode
            key={journey.id}
            journey={journey}
            inputPosition="bottom"
            width="narrow"
            showAdd={false}
            updateNote={handleEditNote}
          />
        </div>
        <div className={styles.notesTextField}>
          <div className="fs-mask">
            <TextField
              label=""
              onChange={handleNoteChange}
              placeholder="Type a note..."
              value={noteForAdding}
              autoComplete={false}
              disabled={noteLoading}
              multiline
            />
          </div>
          <div className={styles.saveNoteButton}>
            <Button
              onClick={handleNoteAdd}
              disabled={noteForAdding.trim().length === 0}
              loading={noteLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </Collapsible>
    </div>
  );
};
