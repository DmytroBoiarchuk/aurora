import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
import Block from '../../../UI/Block/Block';
import usersData from '../../../database/usersData';
import Procedure from '../../MastersPage/components/ProceduresBlock/components/Procedure/Procedure';
import classes from './ProcedureBlockSetting.module.scss';
import CreateProcedureForm from './components/CreateProcedureForm/CreateProcedureForm';

function ProcedureBlockSetting(): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [formIsShown, setFormIsShown] = useState<boolean>(false);
  const [droppedProcedure, setDroppedProcedure] = useState<string>('');

  function openFormHandler(): void {
    setFormIsShown(true);
  }
  return (
    <Block>
      <div className={classes.block}>
        {usersData.treatments.map((treatment) => (
          <Procedure
            droppedProcedure={droppedProcedure}
            setDroppedProcedure={setDroppedProcedure}
            key={treatment.id}
            procedure={treatment}
            isSettingPage
          />
        ))}
        <button
          onClick={openFormHandler}
          onMouseEnter={(): void => setIsHovered(true)}
          onMouseLeave={(): void => setIsHovered(false)}
          className={classes.addNewProcedureButton}
        >
          <motion.div animate={isHovered ? { rotate: [0, 15, -15, 0] } : { rotate: 0 }} transition={{ duration: 0.5 }}>
            <FaPlus className={classes.plusIcon} />
          </motion.div>
        </button>
      </div>
      <AnimatePresence>{formIsShown && <CreateProcedureForm setFormIsShown={setFormIsShown} />}</AnimatePresence>
    </Block>
  );
}

export default ProcedureBlockSetting;
