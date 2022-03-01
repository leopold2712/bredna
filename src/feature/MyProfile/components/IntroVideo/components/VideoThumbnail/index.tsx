import React from 'react';
import { Button, ButtonGroup } from '@shopify/polaris';
import { PictureType } from '../../../../../../shared/components/FileView';
import { LocalLoader } from '../../../../../../shared/components/LocalLoader';

import styles from './styles.module.scss';

type Props = {
  thumbnail: PictureType;
  video: PictureType;
  loading?: boolean;
  openCustomThumbnail: () => void;
  openVideoThumbnail: () => void;
};

export const VideoThumbnail = ({
  thumbnail,
  video,
  loading,
  openCustomThumbnail,
  openVideoThumbnail,
}: Props): JSX.Element => {
  const getThumbnailSource = (arg: PictureType) => {
    if (typeof arg === 'string') return arg;
    return arg ? URL.createObjectURL(arg) : undefined;
  };
  const thumbnailSource = getThumbnailSource(thumbnail || video);

  return (
    <div className={styles.thumbnailWrapper}>
      <h1>Video thumbnail</h1>
      <p>
        Select a thumbnail that shows what is in your video. A good thumbnail stands out and draws
        viewers&apos; attention.
      </p>

      {thumbnail !== null && thumbnail !== undefined ? (
        <img src={thumbnailSource} alt="thumbnail" className={styles.thumbnailImg} />
      ) : (
        <video src={thumbnailSource} autoPlay={false} className={styles.thumbnailImg}>
          <track kind="captions" />
        </video>
      )}

      <div className={styles.buttons}>
        <ButtonGroup segmented>
          <Button onClick={openCustomThumbnail}>Add custom thumbnail</Button>
          <Button onClick={openVideoThumbnail}>Choose video&apos;s frame</Button>
        </ButtonGroup>
      </div>

      {loading && <LocalLoader />}
    </div>
  );
};
