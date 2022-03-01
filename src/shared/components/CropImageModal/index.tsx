import { Modal, Button, DropZone, Banner, Stack } from '@shopify/polaris';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './style.scss';
import { imageFormats, videoFormats } from '../FileView';
import { checkIsMobile } from '../../utils';

type CropProps = {
  isOpenModal: boolean;
  uploadCroppedImage: (image: File) => void;
  closeModal: () => void;
  aspectRatio?: number;
  uploadVideo?: (video: File) => void;
  removeFileTitle?: string;
  removeFile?: () => void;
  accept?: string;
  title?: string;
  showDelete?: boolean;
};

interface ICrop {
  aspect?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  unit?: 'px' | '%';
}

export const CropImageModal: React.FC<CropProps> = ({
  isOpenModal,
  uploadCroppedImage,
  closeModal,
  aspectRatio,
  uploadVideo,
  removeFileTitle,
  removeFile,
  accept,
  title,
  showDelete = true,
}: CropProps) => {
  const [crop, setCrop] = useState<ICrop>({ aspect: aspectRatio });
  const [completedCrop, setCompletedCrop] = useState<ICrop | null>(null);
  const [upImg, setUpImg] = useState<string | ArrayBuffer | null>();
  const [fileName, setFileName] = useState<string>('');
  const [formatError, setFormatError] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onCloseModalHandler = () => {
    setUpImg(null);
    setCompletedCrop(null);
    closeModal();
  };

  const isFileVideo = (format: string): boolean => videoFormats.includes(format.toUpperCase());

  const isFileValid = (format: string): boolean =>
    videoFormats.includes(format.toUpperCase()) || imageFormats.includes(format.toUpperCase());

  const fileUploadHandler = (file: File) => {
    setFormatError(false);
    const formatSeparator = file.name.lastIndexOf('.');
    const fileFormat = file.name.slice(formatSeparator + 1);
    if (fileFormat && isFileValid(fileFormat)) {
      if (isFileVideo(fileFormat)) {
        if (uploadVideo) {
          uploadVideo(file);
          onCloseModalHandler();
          return;
        }
        setFormatError(true);
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setUpImg(reader.result);
      });
      reader.readAsDataURL(file);
      setFileName(file.name);
    } else {
      setFormatError(true);
    }
  };

  const handleProfileDropZoneDrop = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      fileUploadHandler(file);
    } else {
      setFormatError(true);
    }
  }, []);

  const onLoad = useCallback(
    (img) => {
      // @ts-ignore
      imgRef.current = img;

      setTimeout(() => setCrop({ width: img.width / 2, aspect: aspectRatio }), 0);
    },
    [upImg],
  );

  // @ts-ignore
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      fileUploadHandler(file);
    } else {
      setFormatError(true);
    }
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    if (image && canvas) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');
      const pixelRatio = window.devicePixelRatio;

      if (crop && crop.width && crop.height) {
        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        if (ctx) {
          ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
          ctx.imageSmoothingQuality = 'high';

          ctx.drawImage(
            image,
            // @ts-ignore
            crop.x * scaleX,
            // @ts-ignore
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
          );
        }
      }
    }
  }, [completedCrop]);

  async function generateDownload(canvas: HTMLCanvasElement, crop: typeof completedCrop) {
    if (!crop || !canvas) {
      return;
    }

    const image = imgRef.current;
    const uploadCanvas = document.createElement('canvas');

    if (image && uploadCanvas) {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      if (crop && crop.width && crop.height) {
        uploadCanvas.width = Math.ceil(crop.width * scaleX);
        uploadCanvas.height = Math.ceil(crop.height * scaleY);
        const ctx = uploadCanvas.getContext('2d');
        if (ctx && crop.x !== undefined && crop.y !== undefined) {
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY,
          );
          // eslint-disable-next-line consistent-return
          uploadCanvas.toBlob(
            (blob) => {
              // @ts-ignore
              blob.name = fileName;
              // @ts-ignore
              uploadCroppedImage(blob);
              onCloseModalHandler();
              return blob;
            },
            'image/jpeg',
            1,
          );
        }
      }
    }
  }

  const uploadHandler = () => {
    if (previewCanvasRef && previewCanvasRef.current)
      generateDownload(previewCanvasRef.current, completedCrop);
  };

  return (
    <Modal open={isOpenModal} onClose={onCloseModalHandler} title={title || ''}>
      <Modal.Section>
        <div className="upload-modal__dropzone-container">
          <div className="upload-modal__dropzone-container__crop-section">
            {upImg ? (
              <div className="upload-modal__crop-wrapper">
                <ReactCrop
                  src={typeof upImg === 'string' ? upImg : ''}
                  onChange={(c) => setCrop({ ...c, aspect: aspectRatio })}
                  onImageLoaded={onLoad}
                  onComplete={(c) => setCompletedCrop(c)}
                  crop={crop}
                  imageStyle={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            ) : (
              <div>
                <DropZone
                  onDrop={handleProfileDropZoneDrop}
                  allowMultiple={false}
                  accept={accept || 'image/*, video/*'}
                >
                  <DropZone.FileUpload
                    actionHint={
                      checkIsMobile() ? 'click here to upload file' : 'or drop file to upload'
                    }
                  />
                </DropZone>
                {showDelete && (
                  <div style={{ textAlign: 'right' }}>
                    <Button
                      plain
                      onClick={() => {
                        if (removeFile) removeFile();
                      }}
                    >
                      {removeFileTitle || 'remove file'}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="upload-modal__preview-wrapper">
            <div>
              <canvas
                ref={previewCanvasRef}
                className="upload-modal__preview-canvas"
                style={{ width: '160px', height: aspectRatio === 16 / 9 ? '90px' : '160px' }}
              />
            </div>

            {upImg && (
              <div>
                <input
                  type="file"
                  accept={accept || 'image/*, video/*'}
                  id="file"
                  className="inputfile"
                  onChange={onSelectFile}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="file">Upload another file</label>
              </div>
            )}
          </div>
        </div>
      </Modal.Section>
      <Modal.Section>
        <Stack distribution="trailing">
          <Button
            primary
            onClick={uploadHandler}
            disabled={
              upImg === undefined ||
              upImg === null ||
              (!!completedCrop && (completedCrop.width === 0 || completedCrop?.height === 0))
            }
          >
            Upload
          </Button>
        </Stack>
        {formatError && (
          <div style={{ paddingTop: '2rem' }}>
            <Banner
              title="Incorrect format"
              onDismiss={() => setFormatError(false)}
              status="critical"
            >
              <p>File has incorrect format. Please add valid (png, jpg) file</p>
            </Banner>
          </div>
        )}
      </Modal.Section>
    </Modal>
  );
};
