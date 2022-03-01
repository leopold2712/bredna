import React from 'react';
import { Modal, TextContainer } from '@shopify/polaris';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  deleteLoading: boolean;
};

const CancelSessionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onDelete,
  deleteLoading,
}: Props) => (
  <Modal
    open={isOpen}
    title="Cancel session"
    onClose={onClose}
    secondaryActions={[
      {
        content: 'Never mind',
        onAction: onClose,
      },
      {
        content: 'Cancel session',
        onAction: onDelete,
        destructive: true,
        loading: deleteLoading,
      },
    ]}
  >
    <Modal.Section>
      <TextContainer>
        <p>
          In case you choose to cancel a session, session will be removed from calendar and client
          who purchased will be refunded. Please be aware of it might affect your final earnings.
        </p>
      </TextContainer>
    </Modal.Section>
  </Modal>
);
export default CancelSessionModal;
