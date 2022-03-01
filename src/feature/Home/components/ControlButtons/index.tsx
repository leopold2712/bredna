import React from 'react';
import { Stack, Button } from '@shopify/polaris';
import { ChevronLeftMinor } from '@shopify/polaris-icons';

import { TabSheets } from '../../constants/TabSheet';
import { useCustomWindowWidth } from '../../../../shared/hooks/useCustomWindowWidth';

import styles from './buttons.module.scss';

type Props = {
  handleBack: () => void;
  handleSkip: () => void;
  handleSaveAndContinue: () => void;
  activePage: TabSheets;
};

const ControlButtons: React.FC<Props> = ({
  handleBack,
  handleSkip,
  handleSaveAndContinue,
  activePage,
}: Props) => {
  const { tabletView } = useCustomWindowWidth();

  return (
    <div
      className={
        activePage === TabSheets.completeProfessionalID ? styles.wrapper : styles.firstPage
      }
    >
      {activePage === TabSheets.completeProfessionalID && (
        <Button
          onClick={handleBack}
          icon={!tabletView ? ChevronLeftMinor : undefined}
          plain
          monochrome
          removeUnderline={tabletView}
        >
          Back
        </Button>
      )}

      <Stack spacing="loose" alignment="center">
        {activePage !== TabSheets.completeProfile && (
          <Button onClick={handleSkip} plain monochrome>
            Skip
          </Button>
        )}
        <Button primary onClick={handleSaveAndContinue}>
          Save and continue
        </Button>
      </Stack>
    </div>
  );
};

export default ControlButtons;
