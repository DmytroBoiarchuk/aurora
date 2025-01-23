import React, { FormEvent, useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import classes from './Booking.module.scss';
import PhoneInputComponent from '../../../../../../components/PhoneInput/PhoneInputComponent';
import MyDatePicker from '../../../../../../components/DatePicker/MyDatePicker';
import SmallButton from '../../../../../../UI/S-Button/SmallButton';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import Input from '../../../../../../UI/Input/Input';
import TimePicker from '../../../../../../components/TimePicker/TimePicker';
import { formatDuration } from '../../../../../../assets/functions/functions';
import { clearBooking, setBooking } from '../../../../../../store/modules/bookingReducer/reducer';
import { UsersDataInterface } from '../../../../../../assets/interfaces/interfaces';
import { BookingInterface } from '../../../../../../assets/interfaces/reduxInterfaces';
import { queryClient } from '../../../../../../query';
import MyModal from '../../../../../../UI/Modal/MyModal';
import MediumButton from '../../../../../../UI/M-Button/MediumButton';

interface BookingProps {
  closeBooking: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBookingConfirmed?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  isManualBooking?: boolean;
  closeModal?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}
async function sendManualBooking(bookingData: BookingInterface): Promise<void> {
  // const response = await fetch() ...
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
}
function Booking({
  closeBooking,
  setIsBookingConfirmed,
  isManualBooking = false,
  closeModal,
}: BookingProps): JSX.Element {
  const { mutate } = useMutation({
    mutationFn: sendManualBooking,
    onMutate: (bookingData) => {
      const prevData: UsersDataInterface | undefined = queryClient.getQueryData(['MastersData']);
      if (prevData)
        queryClient.setQueryData(['MastersData'], {
          ...prevData,
          booked: [...prevData!.booked, bookingData],
          isConfirmed: true,
        });
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['MastersData'], context);
    },
  });
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const mastersData: UsersDataInterface | undefined = queryClient.getQueryData(['MastersData']);
  const [isDatePicked, setIsDatePicked] = useState<boolean>(false);
  const bookingInfo = useAppSelector((state) => state.bookingReducer);
  const isMultipleOptions =
    mastersData?.treatments.find((treatment) => treatment.procedureName === bookingInfo.procedureName)?.options.length >
    1;
  const dispatch = useAppDispatch();
  function backButtonHandler(e): void {
    e.preventDefault();
    closeBooking(false);
  }

  function submitFormHandler(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData);
    dispatch(setBooking(formObject));
    setAreYouSureModal(true);
  }
  function handleConfirmAreYouSureModal(): void {
    if (!isManualBooking && setIsBookingConfirmed) {
      setIsBookingConfirmed(true);
    } else if (closeModal) {
      closeModal(false);
    }
    closeBooking(false);
    mutate(bookingInfo);
    setAreYouSureModal(false);
    //  dispatch(clearBooking());
  }
  return (
    <div className={classes.bookingContainer}>
      <form onSubmit={submitFormHandler}>
        <SmallButton className={classes.backButtonStyles} onClick={backButtonHandler}>
          <MdArrowBackIosNew />
        </SmallButton>
        <div className={classes.leftSide}>
          <h1 className={classes.header}>
            {!isMultipleOptions
              ? bookingInfo.procedureName
              : `${bookingInfo.procedureName}(${formatDuration(bookingInfo.duration)})`}
          </h1>

          <div className={classes.nameBlock}>
            <Input
              required={!isManualBooking}
              placeholder="Enter your name"
              id="customerName"
              type="text"
              name="name"
            />
            <Input
              required={!isManualBooking}
              placeholder="Enter your surname"
              id="customerSurname"
              type="text"
              name="surname"
            />
          </div>

          <div className={classes.inputStyle}>
            <label>Phone number</label>
            <PhoneInputComponent />
          </div>
          <Input
            required={!isManualBooking}
            placeholder="Enter your email"
            id="customerEmail"
            type="email"
            name="email"
          />
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
      <MyModal modalIsShown={areYouSureModal} setModalIsShown={setAreYouSureModal}>
        <div className={classes.areYouSureModalBody}>
          <p>Are you sure to ?</p>
          <div className={classes.modalButtonsContainer}>
            <MediumButton onClick={handleConfirmAreYouSureModal}>Confirm</MediumButton>
            <MediumButton onClick={(): void => setAreYouSureModal(false)}>Cancel</MediumButton>
          </div>
        </div>
      </MyModal>
    </div>
  );
}

export default Booking;
