import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { AnimatePresence, motion } from 'framer-motion';
import classes from './MyModal.module.scss';

interface MyModalProps {
  modalIsShown: boolean;
  children: React.ReactElement;
  setModalIsShown: React.Dispatch<React.SetStateAction<boolean>>;
}
function MyModal({ children, modalIsShown, setModalIsShown }: MyModalProps): JSX.Element {
  const backdropRef = useRef<HTMLDivElement>(null);
  function handleClickOutside(e: React.MouseEvent<HTMLDivElement>): void {
    e.stopPropagation();
    if (backdropRef.current && !backdropRef.current.contains(e.target as Element)) {
      setModalIsShown(false);
    }
  }
  useEffect(() => {
    if (modalIsShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Чистим эффект при размонтировании
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalIsShown]);
  return ReactDOM.createPortal(
    <AnimatePresence>
      {modalIsShown && (
        <motion.div
          onClick={handleClickOutside}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={classes.modalBackDrop}
        >
          <motion.div
            initial={{ opacity: 0, top: '25%' }}
            animate={{ opacity: 1, top: '50%' }}
            exit={{ opacity: 0, top: '25%' }}
            transition={{ duration: 0.5 }}
            ref={backdropRef}
            className={classes.modalWrapper}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  , document.body);
}

export default MyModal;
