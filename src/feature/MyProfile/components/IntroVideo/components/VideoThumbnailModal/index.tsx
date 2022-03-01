import React, { useRef } from 'react';
import { Button, Modal } from '@shopify/polaris';
import { generateThumbnailFromVideo } from '../../../../../../shared/utils/generateImageFromVideo';
import { PictureType } from '../../../../../../shared/components/FileView';

import styles from './styles.module.scss';

type Props = {
  video: PictureType;
  open: boolean;
  onClose: () => void;
  onChooseAnother: (arg: File) => void;
};

export const VideoThumbnailModal = ({
  video,
  open,
  onClose,
  onChooseAnother,
}: Props): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const getVideoSource = () => {
    if (typeof video === 'string') return video;
    return video ? URL.createObjectURL(video) : undefined;
  };

  const generateThumbnail = () => {
    if (videoRef && videoRef.current) {
      const file = generateThumbnailFromVideo(videoRef.current);
      onChooseAnother(file);
    }
  };

  const source = getVideoSource();

  return (
    <Modal title="Choose video thumbnail" open={open} onClose={onClose}>
      <Modal.Section>
        <div className={styles.videoWrapper}>
          <p>Please choose the video&apos;s frame for thumbnail:</p>
          <video src={source} controls ref={videoRef} crossOrigin="anonymous">
            <track kind="captions" />
          </video>

          <div className={styles.buttons}>
            <Button primary onClick={generateThumbnail}>
              Add
            </Button>
          </div>
        </div>
      </Modal.Section>
    </Modal>
  );
};
