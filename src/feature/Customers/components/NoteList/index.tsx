import React from 'react';
import { useAppSelector } from '../../../../main/store/hooks';
import { LocalLoader } from '../../../../shared/components/LocalLoader';
import type { JourneyDTO } from '../../dtos/journey.dto';
import { selectClientJourneys } from '../../store/selectors';
import { Note } from '../Note';

import styles from './styles.module.scss';

type Props = {
  list: JourneyDTO[];
  onClickEdit: (journey: JourneyDTO, value: string, id: number) => void;
};

export const NoteList: React.FC<Props> = ({ list, onClickEdit }: Props): JSX.Element => {
  const { loading } = useAppSelector(selectClientJourneys);

  const handleClick = (jrn: JourneyDTO) => (value: string, id: number) =>
    onClickEdit(jrn, value, id);

  return (
    <div className={styles.notesList}>
      {loading && <LocalLoader />}

      {list.map((journey) =>
        journey.notes.map((note) => (
          <Note
            note={note}
            title={journey.title}
            type={journey.type}
            onClick={handleClick(journey)}
          />
        )),
      )}
    </div>
  );
};
