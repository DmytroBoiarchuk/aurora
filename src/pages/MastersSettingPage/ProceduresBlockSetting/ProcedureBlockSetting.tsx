import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import Block from '../../../UI/Block/Block';
import Procedure from '../../MastersPage/components/ProceduresBlock/components/Procedure/Procedure';
import classes from './ProcedureBlockSetting.module.scss';
import CreateProcedureForm from './components/CreateProcedureForm/CreateProcedureForm';
import { useAppSelector } from '../../../hooks/reduxHooks';
import MyModal from '../../../UI/Modal/MyModal';

function ProcedureBlockSetting(): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [formIsShown, setFormIsShown] = useState<boolean>(false);
  const [droppedProcedure, setDroppedProcedure] = useState<string>('');
  const treatmentsData = useAppSelector((state) => state.treatmentsReducer.treatments);
  function openFormHandler(): void {
    setFormIsShown(true);
  }

  return (
    <Block>
      <div className={classes.block}>
        {treatmentsData.map((treatment) => (
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
      <MyModal setModalIsShown={setFormIsShown} modalIsShown={formIsShown}>
        <CreateProcedureForm setFormIsShown={setFormIsShown} />
      </MyModal>
    </Block>
  );
}

export default ProcedureBlockSetting;
