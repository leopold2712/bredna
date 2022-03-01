import React from 'react';
import { Button, Modal, Stack } from '@shopify/polaris';

type Props = {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteSlotConfirm = ({ open, loading, onClose, onConfirm }: Props): JSX.Element => (
  <Modal open={open} title="Delete slot" onClose={onClose}>
    <Modal.Section>Are you sure you want to delete this slot?</Modal.Section>
    <Modal.Section>
      <Stack distribution="trailing">
        <Button onClick={onClose}>Cancel</Button>
        <Button destructive onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </Stack>
    </Modal.Section>
  </Modal>
);
