/* eslint-disable jsx-a11y/media-has-caption */
import React, { useMemo } from 'react';
import { Caption, DropZone, Stack } from '@shopify/polaris';
import { Loader } from '../Loader';
import './file-view.scss';

export type PictureType = File | string | null | undefined;

export const videoFormats = ['MP4', 'MOV', 'WMV', 'FLV', 'AVI', 'AVCHD', 'WEBM', 'MKV'];
export const imageFormats = ['JPEG', 'JPG', 'PNG'];

type PropsType = {
  file: PictureType;
  validTypes: string[];
  size?: { w: number; h: number };
  buttonText?: string;
  imageHint?: string;
  videoHint?: string;
  isVideo?: boolean;
  loading?: boolean;
  showLimitText?: boolean;
  icon?: 'Upload' | 'MediaFile';
};

const FileView: React.FC<PropsType> = ({
  file,
  validTypes,
  buttonText = 'Select File',
  imageHint = 'Drag & drop or click to add image.',
  videoHint = 'Drag & drop or click to add video.',
  isVideo = false,
  loading = false,
  showLimitText = true,
  icon = 'Upload',
}: PropsType) => {
  let source: React.Key | null | undefined;
  if (typeof file === 'string') {
    source = file;
  } else if (file && validTypes.includes(file.type)) {
    source = window.URL.createObjectURL(file);
  } else {
    source = 'https://cdn.shopify.com/s/files/1/0757/9955/files/New_Post.png?12678548500147524304';
  }

  const checkIfIsVideo = (fileObj: PictureType) =>
    (isVideo && typeof fileObj === 'string') ||
    (typeof fileObj === 'string' && videoFormats.includes(fileObj.slice(-3).toUpperCase())) ||
    (typeof fileObj === 'object' &&
      fileObj?.name &&
      videoFormats.includes(fileObj.name.slice(-3).toUpperCase()));

  const checkIfFile = (fileOrString: string | File): boolean => typeof fileOrString !== 'string';

  const fileUploadClassNames = `${isVideo || !showLimitText ? 'file-upload ' : ''}${
    showLimitText ? 'file-upload-with-content ' : ''
  }${icon === 'MediaFile' ? 'icon--mediaFile' : ''}`;

  const renderVideo = useMemo(
    () => (
      <div>
        {loading && <Loader />}
        {/* // @ts-ignore */}
        <video controls className="file-view__media" key={source}>
          {/* @ts-ignore */}
          <source src={!checkIfFile(file) ? file : source} />
        </video>
      </div>
    ),
    [file, loading],
  );

  return file ? (
    <div className="file-view">
      <Stack alignment="center" distribution="center">
        <div className="file-view__media-container">
          {checkIfIsVideo(file) ? (
            renderVideo
          ) : (
            <>
              {loading && <Loader />}
              <img
                src={source}
                // @ts-ignore
                alt={checkIfFile(file) ? file.name : ''}
                className="file-view__media"
              />
            </>
          )}
          {checkIfFile(file) && (
            <div className="file-view__caption">
              {/* @ts-ignore */}
              {file.name}
              {/* @ts-ignore */}
              <Caption>{`${file.size} bytes`}</Caption>
            </div>
          )}
        </div>
      </Stack>
    </div>
  ) : (
    <div className={fileUploadClassNames}>
      <DropZone.FileUpload actionTitle={buttonText} actionHint={isVideo ? videoHint : imageHint} />
    </div>
  );
};

export default FileView;
