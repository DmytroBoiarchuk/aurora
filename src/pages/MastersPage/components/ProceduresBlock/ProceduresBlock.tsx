import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Block from '../../../../UI/Block/Block';
import Procedure from './components/Procedure/Procedure';
import classes from './Procedures.module.scss';
import usersData from '../../../../database/usersData';
import Booking from './components/Booking/Booking';
import BookingConfirmed from './components/BookingConfirmed/BookingConfirmed';

function ProceduresBlock(): JSX.Element {
  const [isBookingProcess, setIsBookingProcess] = useState<boolean>(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState<boolean>(false);
  function getAnimation(): { opacity: number; x: string; visibility: string } {
    if (isBookingProcess && !isBookingConfirmed) {
      return { opacity: 1, x: '-25%', visibility: 'visible' };
    }
    if (!isBookingProcess && isBookingConfirmed) {
      return { opacity: 0, x: '-100%', visibility: 'hidden' };
    }
    if (!isBookingProcess && !isBookingConfirmed) {
      return { opacity: 0, x: '100%', visibility: 'hidden' };
    }
  }

  return (
    <Block classNames={classes.proceduresBlock}>
      <motion.div
        animate={
          !isBookingProcess && !isBookingConfirmed
            ? { opacity: 1, x: '75%', visibility: 'visible' }
            : { opacity: 0, x: '-100%', visibility: 'hidden' }
        }
        transition={{ duration: 0.5 }}
        className={classes.proceduresContainer}
      >
        {usersData.treatments.map((treatment) => (
          <Procedure key={treatment.id} procedure={treatment} setIsBookingProcess={setIsBookingProcess} />
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: '100%', visibility: 'hidden' }}
        animate={getAnimation()}
        transition={{ duration: 0.5 }}
      >
        <Booking
          setIsBookingProcess={setIsBookingProcess}
          isBookingConfirmed={isBookingConfirmed}
          setIsBookingConfirmed={setIsBookingConfirmed}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: '+100%', visibility: 'hidden' }}
        animate={
          isBookingConfirmed && !isBookingProcess
            ? { opacity: 1, x: '-200%', visibility: 'visible' }
            : { opacity: 0, x: '0%', visibility: 'hidden' }
        }
        transition={{ duration: 0.5 }}
      >
        <BookingConfirmed setIsBookingConfirmed={setIsBookingConfirmed} />
      </motion.div>
    </Block>
  );
}

export default ProceduresBlock;
