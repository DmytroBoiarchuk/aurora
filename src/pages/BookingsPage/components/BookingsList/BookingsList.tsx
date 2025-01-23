import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { BookingsInterface, TreatmentsProps, UsersDataInterface } from '../../../../assets/interfaces/interfaces';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import { setProcedureDetails } from '../../../../store/modules/bookingReducer/reducer';
import { fetchJsonData } from '../../../../assets/functions/functions';
import Block from '../../../../UI/Block/Block';
import classes from './BookingsList.module.scss';
import BookingsSearchFilter from './components/BookingsSearchFilter/BookingsSearchFilter';
import SmallButton from '../../../../UI/S-Button/SmallButton';
import BookingCard from './components/BookingCard/BookingCard';
import MyModal from '../../../../UI/Modal/MyModal';
import Booking from '../../../MastersPage/components/ProceduresBlock/components/Booking/Booking';
import TreatmentButton from './components/TreatmentButton/TreatmentButton';

function compareDates(booking1: BookingsInterface, booking2: BookingsInterface): number {
  const date1 = new Date(booking1.date).getTime();
  const date2 = new Date(booking2.date).getTime();

  if (date1 === date2) {
    return booking1.time - booking2.time;
  }
  return date1 - date2;
}

function BookingsPage(): JSX.Element {
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [bookingsList, setBookingsList] = useState<BookingsInterface[] | undefined>();
  const dispatch = useAppDispatch();

  function manuallySetProcedureName(treatment: TreatmentsProps, duration: number | undefined): void {
    dispatch(
      setProcedureDetails({
        procedureName: treatment.procedureName,
        duration: duration || treatment.options[0],
      })
    );
    setIsBookingFormOpen(true);
  }
  const { data } = useQuery<UsersDataInterface>({
    // ->  if was loaded - do not load / if was not loaded - load
    queryKey: ['MastersData'],
    queryFn: fetchJsonData,
  });

  // show modal
  useEffect(() => {
    if (!modalIsShown) {
      setIsBookingFormOpen(false);
    }
  }, [modalIsShown]);
  return (
    <Block classNames={classes.bookingsContainer}>
      <menu className={classes.topMenu}>
        <BookingsSearchFilter setBookingsList={setBookingsList} />
        <SmallButton onClick={(): void => setModalIsShown(true)}>
          <FaPlus size={45} />
        </SmallButton>
      </menu>

      <AnimatePresence>
        {bookingsList
          ?.sort((a, b) => compareDates(a, b))
          .map((booking) => <BookingCard key={booking.email} booking={booking} />)}
      </AnimatePresence>
      <MyModal modalIsShown={modalIsShown} setModalIsShown={setModalIsShown}>
        <div className={classes.modalContainer}>
          <motion.div
            initial={{ x: 0 }}
            animate={!isBookingFormOpen ? { x: 0 } : { x: '-2000px' }}
            transition={{ duration: 0.5 }}
            className={classes.modalButtons}
          >
            {data?.treatments.map((treatment: TreatmentsProps) => (
              <TreatmentButton
                key={treatment.id}
                treatment={treatment}
                manuallySetProcedureName={manuallySetProcedureName}
              />
            ))}
          </motion.div>
          <motion.div
            initial={{ x: '2000px' }}
            animate={!isBookingFormOpen ? { x: '2000px' } : { x: '-75%' }}
            transition={{ duration: 0.5 }}
          >
            <Booking closeModal={setModalIsShown} closeBooking={setIsBookingFormOpen} isManualBooking />
          </motion.div>
        </div>
      </MyModal>
    </Block>
  );
}

export default BookingsPage;
