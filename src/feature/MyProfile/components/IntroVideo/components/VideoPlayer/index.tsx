import React from 'react';
import { LocalLoader } from '../../../../../../shared/components/LocalLoader';

import styles from './styles.module.scss';

type Props = {
  video: File | string;
  loading?: boolean;
};

export const VideoPlayer = ({ video, loading }: Props): JSX.Element => {
  const videoSource = typeof video === 'string' ? video : URL.createObjectURL(video);

  return (
    <div className={styles.wrapper}>
      <video src={videoSource} controls>
        <track kind="captions" />
      </video>

      {loading && <LocalLoader />}
    </div>
  );
};
