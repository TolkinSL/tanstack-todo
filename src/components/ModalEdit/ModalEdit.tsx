import React, { ReactNode }  from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './ModalEdit.module.css';

const modalRoot = document.querySelector('#modal-root');

interface ModalEditProps {
    closeModal: () => void;
    children: ReactNode;
  }

const ModalEdit: React.FC<ModalEditProps> = ({ children, closeModal}) => {
  React.useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
          closeModal();
        }
      };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return createPortal(
    <>
      <div className={styles.modal}>{children}</div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalRoot  ?? document.body
  );
};

export default ModalEdit;
