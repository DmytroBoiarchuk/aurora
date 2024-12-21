import React, { useEffect, useRef, useState } from 'react';
import { RiArrowDownWideLine, RiArrowUpWideLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import MediumButton from '../../../../../../UI/M-Button/MediumButton';
import { BookingProcedureProps, TreatmentsProps } from '../../../../../../assets/interfaces/interfaces';
import classes from './Procedure.module.scss';
import { useAppDispatch } from '../../../../../../hooks/reduxHooks';
import { setProcedureDetails } from '../../../../../../store/modules/bookingReducer/reducer';
import usersData from '../../../../../../database/usersData';
import { formatDuration } from '../../../../../../assets/functions/functions';
import { MdEdit } from "react-icons/md";
import CreateProcedureForm
  from '../../../../../MastersSettingPage/ProceduresBlockSetting/components/CreateProcedureForm/CreateProcedureForm';

function Procedure({
  procedure: { img, procedureName, description, price, options, id },
  setIsBookingProcess,
  droppedProcedure,
  setDroppedProcedure,
  isSettingPage=false,
}: {
  droppedProcedure: string;
  setDroppedProcedure: React.Dispatch<React.SetStateAction<string>>;
  procedure: TreatmentsProps;
  setIsBookingProcess?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  isSettingPage?: boolean;
}): JSX.Element {
  const blockRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [isDropped, setIsDropped] = useState<boolean>(false);
  const [formIsShown, setFormIsShown] = useState<boolean>(false);
  const selectionRef = useRef<HTMLSelectElement | null>(null);
  useEffect(() => {
    if(droppedProcedure !== id.toString()){
      if (blockRef.current)
      blockRef.current.style.zIndex = '1';
      setIsDropped(false);
    }
  },[droppedProcedure]);
  function toggleDropdown(): void {
    if (!isDropped && blockRef.current) {
      blockRef.current.style.zIndex = '10';
      setDroppedProcedure(id.toString());
    }

    setIsDropped((prevState) => !prevState);
  }

  function onBookHandler(): void {
    const procedure: BookingProcedureProps = {
      procedureName,
      duration:
        Number(selectionRef.current?.value) ||
        usersData.treatments.find((treatment) => treatment.procedureName)!.options[0],
    };
    dispatch(setProcedureDetails(procedure));
    if (setIsBookingProcess) setIsBookingProcess(true);
  }

  return (
    <>
    <div ref={blockRef} className={classes.procedureBlock}>
      <div className={classes.topLevel}>
        {isSettingPage && <button className={classes.editButton} onClick={():void => setFormIsShown(true)}><MdEdit size={20}/></button>}
        <div className={classes.imgBox}>
          <img src={img} alt="lush" />
        </div>
        <p>{procedureName}</p>
        <p>{price}{usersData.currency}</p>
        <MediumButton onClick={(): void => onBookHandler()}>Book</MediumButton>
        {options.length > 1 && (
          <select ref={selectionRef} className={classes.options}>
            {options.map((option) => (
              <option key={option} value={option}>
                {formatDuration(option)}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={classes.lowLevel}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isDropped ? { opacity: 1, y: 0, height: 210 } : { opacity: 0, y: -200, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{description}</p>
        </motion.div>
        <button className={classes.moreAboutButton} onClick={toggleDropdown}>
          <span>More about</span>
          {isDropped ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
        </button>
      </div>
    </div>
      <AnimatePresence>{formIsShown && <CreateProcedureForm isEditing procedure={{ img, procedureName, description, price, options, id }} setFormIsShown={setFormIsShown} />}</AnimatePresence>
    </>
  );
}

export default Procedure;
