import { Icon, Subheading, TextStyle } from '@shopify/polaris';
import { CircleCancelMinor, NoteMinor } from '@shopify/polaris-icons';
import React, { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './fileDropZone.scss';
import { baseStyle, activeStyle, acceptStyle, rejectStyle } from './styles';

type Props = {
  files: File[] | string;
  setFiles: (files: File[]) => void;
  deleteFile: (name: string) => void;
  title?: string;
  subtitle?: string;
  disabled?: boolean;
};

const FileDropzone: React.FC<Props> = ({
  files,
  setFiles,
  deleteFile,
  title,
  subtitle,
  disabled = false,
}: Props) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    [setFiles],
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: '.pdf',
    disabled,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  return (
    <div className="file-dropzone__wrapper">
      {/* @ts-ignore */}
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className={disabled ? 'file-dropzone__text-disabled' : 'file-dropzone__text'}>
          {title || 'Add files (optional)'}
        </p>
        <p className="file-dropzone__subtitle">{subtitle || 'PDF'}</p>
      </div>
      {files.length > 0 && (
        <div className="file-dropzone__files-wrapper">
          <p className="file-dropzone__attached-title">Attached files</p>
          {typeof files !== 'string' &&
            files.map((file) => (
              <div key={file.name} className="file-dropzone__file-item">
                <Icon source={NoteMinor} color="base" />
                <div className="file__title">
                  <TextStyle variation="subdued">{`${file.name} ${file.size}bytes`}</TextStyle>
                </div>
                <button
                  type="button"
                  className="file__button"
                  onClick={() => deleteFile(file.name)}
                >
                  <Icon source={CircleCancelMinor} color="base" />
                </button>
              </div>
            ))}
          {typeof files === 'string' && (
            <a href={files} target="_blank" rel="noreferrer">
              <div key={files} className="file-dropzone__file-item">
                <Icon source={NoteMinor} color="base" />
                <div className="file__title">
                  <TextStyle variation="subdued">
                    {files.slice(files.lastIndexOf('/') + 1)}
                  </TextStyle>
                </div>
                <button
                  type="button"
                  className="file__button"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteFile(files);
                  }}
                >
                  <Icon source={CircleCancelMinor} color="base" />
                </button>
              </div>
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
