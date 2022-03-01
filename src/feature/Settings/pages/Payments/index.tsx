import { Card, DropZone, Layout, Page } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import FileView from '../../../../shared/components/FileView';
import { SaveBar } from '../../../../shared/components/Header/SaveBar';

import style from './payments.module.scss';

const PaymentsSettings = (): JSX.Element => {
  const [taxFormPicFile, setTaxFormPicFile] = useState(null);
  const [authenticationPicFile, setAuthenticationPicFile] = useState(null);
  const [filesTouched, setFilesTouched] = useState(false);
  const [picSizeError, setPicSizeError] = useState(false);

  const handleTaxImageDropZoneDrop = useCallback((_dropFiles, acceptedFiles, _rejectedFiles) => {
    const file = acceptedFiles[0];
    // cloudinary limitation for uploaded pictures
    if (file.size < 10000000) {
      setTaxFormPicFile(file);
      setFilesTouched(true);
    } else {
      setPicSizeError(true);
    }
  }, []);

  const handleAuthenticationImageDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) => {
      const file = acceptedFiles[0];
      // cloudinary limitation for uploaded pictures
      if (file.size < 10000000) {
        setAuthenticationPicFile(file);
        setFilesTouched(true);
      } else {
        setPicSizeError(true);
      }
    },
    [],
  );

  return (
    <Page title="Payments" breadcrumbs={[{ url: '/settings', content: 'Settings' }]}>
      <Layout>
        {filesTouched && (
          <SaveBar
            onConfirm={() => null}
            onDiscard={() => {
              setAuthenticationPicFile(null);
              setTaxFormPicFile(null);
              setFilesTouched(false);
            }}
            isLoading={false}
            disabled={false}
          />
        )}
        <Layout.Section>
          <Layout.AnnotatedSection
            title="Payoneer provider"
            description={
              <p className={style.text}>
                Accept payments using Payoneer. Connect or create your Payoneer account
              </p>
            }
          >
            <Card sectioned>
              <div style={{ height: '260px' }}>
                <div className={style.payoneerContainer}>
                  <span className={style.payoneerHeader}>Payoneer iframe</span>
                </div>
              </div>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Tax form"
            description={
              <p className={style.text}>
                Please submit a signed{' '}
                <a
                  href="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={style.text}
                >
                  W8
                </a>{' '}
                or{' '}
                <a
                  href="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={style.text}
                >
                  W9
                </a>
                , depending on your residential country. If you are not sure which form you need to
                fill out please consult with an accountant from your residential country.
              </p>
            }
          >
            <Card sectioned title="Tax form">
              <div id="videoFile">
                <DropZone
                  disabled={false}
                  onDrop={handleTaxImageDropZoneDrop}
                  allowMultiple={false}
                >
                  <FileView
                    isVideo={false}
                    file={taxFormPicFile}
                    validTypes={['image/gif', 'image/jpeg', 'image/png']}
                    loading={false}
                    imageHint="Or drop files to upload"
                    showLimitText={false}
                    icon="MediaFile"
                  />
                </DropZone>
              </div>
            </Card>
          </Layout.AnnotatedSection>
          <Layout.AnnotatedSection
            title="Authentication"
            description={
              <p className={style.text}>
                Send us a photo of yourself holding your ID or Passport. Please ensure that the
                details on the ID/Passport are clear.
              </p>
            }
          >
            <Card sectioned title="Authentication">
              <div id="videoFile">
                <DropZone
                  disabled={false}
                  onDrop={handleAuthenticationImageDropZoneDrop}
                  allowMultiple={false}
                >
                  <FileView
                    isVideo={false}
                    file={authenticationPicFile}
                    validTypes={['image/gif', 'image/jpeg', 'image/png']}
                    loading={false}
                    imageHint="Or drop files to upload 1600 x 900 px"
                    showLimitText={false}
                    icon="MediaFile"
                  />
                </DropZone>
              </div>
            </Card>
          </Layout.AnnotatedSection>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default PaymentsSettings;
