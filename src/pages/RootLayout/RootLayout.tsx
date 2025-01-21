import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import NavBar from '../../components/NavBar/NavBar';
import classes from './RootLayout.module.scss';

function RootLayout(): JSX.Element {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <AnimatePresence mode="wait">
        <motion.div
          className={classes.pageWrapper}
          key={location.pathname}
          transition={{ duration: 0.2 }}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default RootLayout;
