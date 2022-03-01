import React, { useState, useEffect } from 'react';
import { ChoiceList, Modal } from '@shopify/polaris';
import type { SessionScopeTypes } from '../../dtos/scopeTypes.dto';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (arg: SessionScopeTypes) => void;
  deleteMode?: boolean;
};

export const ChooseEditModeModal = ({
  open,
  onClose,
  onConfirm,
  deleteMode,
}: Props): JSX.Element => {
  const [selected, setSelected] = useState<SessionScopeTypes[]>(['this']);
  const handleChange = (selectedOptions: SessionScopeTypes[]) => {
    setSelected(selectedOptions);
  };

  useEffect(() => {
    if (!open) setSelected(['this']);
  }, [open]);

  return (
    <Modal
      title={deleteMode ? 'Delete recurring session' : 'Edit recurring session'}
      onClose={onClose}
      open={open}
      primaryAction={{
        content: 'OK',
        onAction: () => onConfirm(selected[0]),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <ChoiceList
          title="Edit option"
          titleHidden
          choices={[
            { label: 'This session', value: 'this' },
            { label: 'This and the following sessions', value: 'upcoming' },
            { label: 'All sessions', value: 'all' },
          ]}
          selected={selected}
          onChange={handleChange}
        />
      </Modal.Section>
    </Modal>
  );
};
