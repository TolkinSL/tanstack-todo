import React, { ReactNode } from 'react';

interface ModalOverlayProps {
  closeModal: () => void;
  children?: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ closeModal, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          Закрыть
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalOverlay;