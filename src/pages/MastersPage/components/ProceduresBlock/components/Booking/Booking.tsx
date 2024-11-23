import React, { useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { motion } from 'framer-motion';
import classes from './Booking.module.scss';
import PhoneInputComponent from '../../../../../../components/PhoneInput/PhoneInputComponent';
import MyDatePicker from '../../../../../../components/DatePicker/MyDatePicker';
import SmallButton from '../../../../../../UI/S-Button/SmallButton';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import Input from '../../../../../../UI/Input/Input';
import TimePicker from '../../../../../../components/TimePicker/TimePicker';
import usersData from "../../../../../../database/usersData";
import {formatDuration} from "../../../../../../assets/functions/functions";
import {setBooking} from "../../../../../../store/modules/bookingReducer/reducer";
import BookingConfirmed from "../BookingConfirmed/BookingConfirmed";

function Booking({ setIsBookingProcess, setIsBookingConfirmed }: React.Dispatch<React.SetStateAction<boolean>>): JSX.Element {
  const [isDatePicked, setIsDatePicked] = useState<boolean>(false);

  const bookingInfo = useAppSelector((state) => state.bookingReducer);
  const isMultipleOptions = usersData.treatments.find((treatment) => treatment.procedureName === bookingInfo.procedureName)?.options.length > 1;
  const dispatch = useAppDispatch();
  function backButtonHandler(e): void {
    e.preventDefault();
    setIsBookingProcess(false);
  }

  function submitFormHandler(e): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);
    dispatch(setBooking(formObject));
    setIsBookingProcess(false);
    setIsBookingConfirmed(true);
  }
  return (
    <div className={classes.bookingContainer}>
      <form  onSubmit={submitFormHandler}>
        <SmallButton classNames={classes.backButtonStyles} onClick={backButtonHandler}>
          <MdArrowBackIosNew />
        </SmallButton>
        <div className={classes.leftSide}>
          <h1 className={classes.header}>{!isMultipleOptions? bookingInfo.procedureName : `${bookingInfo.procedureName  }(${formatDuration(bookingInfo.duration)})`}</h1>

          <div className={classes.nameBlock}>
            <Input required placeholder="Enter your name" id="customerName" type="text" name="name" />
            <Input required placeholder="Enter your surname" id="customerSurname" type="text" name="surname" />
          </div>

          <div className={classes.inputStyle}>
            <label>Phone number</label>
            <PhoneInputComponent />
          </div>
          <Input required placeholder="Enter your email" id="customerEmail" type="email" name="email" />
        </div>
        <motion.div
          animate={
            !isDatePicked
              ? { opacity: 1, x: '0%', visibility: 'visible' }
              : { opacity: 0, x: '-100%', visibility: 'hidden' }
          }
          transition={{ duration: 0.4 }}
          className={classes.inputStyle}
        >
          <label>Choose Date</label>
          <MyDatePicker setIsDatePicked={setIsDatePicked} />
        </motion.div>
        <motion.div
          className={classes.timePickerStyles}
          animate={
            !isDatePicked
              ? { opacity: 0, x: '0%', visibility: 'hidden' }
              : { opacity: 1, x: '-100%', visibility: 'visible' }
          }
          transition={{ duration: 0.5 }}
        >

          <TimePicker setIsDatePicked={setIsDatePicked} />
        </motion.div>
      </form>
    </div>
  );
}

export default Booking;
