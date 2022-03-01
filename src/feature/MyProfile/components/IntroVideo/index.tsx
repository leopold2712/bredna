import React, { useCallback, useState } from 'react';
import { DropZone } from '@shopify/polaris';
import { CropImageModal } from '../../../../shared/components/CropImageModal';
import { PictureType } from '../../../../shared/components/FileView';
import { VideoThumbnailModal } from './components/VideoThumbnailModal';
import { VideoThumbnail } from './components/VideoThumbnail';
import { VideoPlayer } from './components/VideoPlayer';
import { validateDropZone } from '../../../../shared/utils/validateDropZone';
import { validVideoTypes } from '../../../../shared/constants/dropzoneValidTypes';

type Props = {
  video: PictureType;
  thumbnail: PictureType;
  loading: boolean;
  onVideoDrop: (arg: File) => void;
  onThumbnailDrop: (arg: File) => void;
};

export const IntroVideo = ({
  video,
  thumbnail,
  loading,
  onVideoDrop,
  onThumbnailDrop,
}: Props): JSX.Element => {
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);

  const openThumbnailCrop = () => setIsCropModalOpen(true);
  const closeThumbnailCrop = () => setIsCropModalOpen(false);
  const toggleThumbnailModal = () => setThumbnailModalOpen((prev) => !prev);

  const handleDropZoneDrop = useCallback((_dropFiles, acceptedFiles) => {
    if (validateDropZone(_dropFiles, acceptedFiles, validVideoTypes)) onVideoDrop(acceptedFiles[0]);
  }, []);

  const handleChooseAnotherFile = (arg: File) => {
    onThumbnailDrop(arg);
    toggleThumbnailModal();
  };

  return (
    <div>
      <DropZone onDrop={handleDropZoneDrop} accept={validVideoTypes.join(', ')}>
        {video ? <VideoPlayer video={video} loading={loading} /> : <DropZone.FileUpload />}
      </DropZone>

      {video && (
        <VideoThumbnail
          thumbnail={thumbnail}
          video={video}
          loading={loading}
          openCustomThumbnail={openThumbnailCrop}
          openVideoThumbnail={toggleThumbnailModal}
        />
      )}

      <VideoThumbnailModal
        open={thumbnailModalOpen}
        onClose={toggleThumbnailModal}
        video={video}
        onChooseAnother={handleChooseAnotherFile}
      />

      <CropImageModal
        isOpenModal={isCropModalOpen}
        uploadCroppedImage={onThumbnailDrop}
        closeModal={closeThumbnailCrop}
        aspectRatio={16 / 9}
        accept="image/*"
        showDelete={false}
      />
    </div>
  );
};
