import React, { useMemo, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { motion } from 'framer-motion';
import { GiConfirmed } from 'react-icons/gi';
import { useMutation } from '@tanstack/react-query';
import { BookingsInterface, UsersDataInterface } from '../../../../assets/interfaces/interfaces';
import classes from './BookingCard.module.scss';
import SmallButton from '../../../../UI/S-Button/SmallButton';
import MyModal from '../../../../UI/Modal/MyModal';
import MediumButton from '../../../../UI/M-Button/MediumButton';
import { queryClient } from '../../../../query';
import BookingCardTable from './components/BookingCardTable';

interface BookingFetchInterface {
  bookingId: string;
  isDeleting: boolean;
}
async function bookingFetch({ bookingId, isDeleting }: BookingFetchInterface): Promise<void> {
  // initiate deleting if is deletion or set confirmation if is not deleting
  return new Promise((resolve, reject): void => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}
interface BookingCardProps {
  booking: BookingsInterface;
}
function calcIsExpired(date: string, time: number): boolean {
  const now = new Date();
  const checkingTime = new Date(date);
  checkingTime.setHours(Math.abs(time));
  checkingTime.setMinutes((time % 1) * 60);
  return now.getTime() > checkingTime.getTime();
}
function BookingCard({ booking }: BookingCardProps): JSX.Element {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(booking.isConfirmed);
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const isExpired: boolean = useMemo((): boolean => calcIsExpired(booking.date, booking.time), [booking]);
  const [modalState, setModalState] = useState<'confirm' | 'cancel' | 'delete' | ''>(isExpired ? 'delete' : '');
  const { mutate } = useMutation({
    mutationFn: bookingFetch,
    onMutate: ({ bookingId, isDeleting }: BookingFetchInterface): UsersDataInterface | undefined => {
      const previousItems: UsersDataInterface | undefined = queryClient.getQueryData(['MastersData']);
      if (isDeleting) {
        queryClient.setQueryData(['MastersData'], (oldData: UsersDataInterface) => ({
          ...oldData,
          booked: oldData.booked.filter((b: BookingsInterface) => b.email !== bookingId),
        }));
      } else {
        queryClient.setQueryData(['MastersData'], (oldData: UsersDataInterface) => ({
          ...oldData,
          booked: oldData.booked.map((b: BookingsInterface) =>
            b.email === bookingId ? { ...b, isConfirmed: true } : b
          ),
        }));
      }
      return previousItems;
    },
    onError: (err: ErrorEvent, variables, context): void => {
      queryClient.setQueryData(['MastersData'], context);
      if (!variables.isDeleting) setIsConfirmed(false);
      // show Error
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['MastersData'] }); // maybe not needed ?
    // },
  });
  function handleDeleteManualBooking(): void {
    mutate({ bookingId: booking.email, isDeleting: true });
  }
  function handleConfirm(): void {
    setModalIsShown(false);
    if (modalState === 'cancel') {
      mutate({ bookingId: booking.email, isDeleting: true });
    } else if (modalState === 'confirm') {
      mutate({ bookingId: booking.email, isDeleting: false });
      setIsConfirmed(true);
    }
    // send email to customer & request to server to set confirmed ( if response is not OK -> set isConfirmed ( false ) )
  }
  function handleClickCardButton(modal: 'confirm' | 'cancel' | 'delete' | ''): void {
    setModalState(modal);
    setModalIsShown(true);
  }
  return (
    <motion.div
      layout="position"
      className={`${classes.cardContainer} ${isExpired ? classes.expiredBooking : ''}`}
      initial={{ x: '-2000px' }}
      animate={{ x: 0 }}
      exit={{ x: '-2000px' }}
      transition={{ duration: 0.4 }}
    >
      {booking.manual && <span className={classes.manualMark}>manually created</span>}

      <BookingCardTable booking={booking} />
      <div className={classes.bookingButtonsContainer}>
        <button
          onClick={
            booking.manual
              ? handleDeleteManualBooking
              : (): void => handleClickCardButton(isExpired ? 'delete' : 'cancel')
          }
          className={classes.cancelButton}
        >
          {isExpired ? 'Delete' : 'Cancel'}
        </button>
        <SmallButton disabled={isConfirmed || isExpired} onClick={(): void => handleClickCardButton('confirm')}>
          <GiConfirmed id={isConfirmed ? classes.confirmed : ''} size={45} />
        </SmallButton>
      </div>
      <MyModal modalIsShown={modalIsShown} setModalIsShown={setModalIsShown}>
        <div className={classes.modalBody}>
          <p>{`Are you sure to ${modalState}?`}</p>
          {!isExpired && (
            <>
              <label>Tell customer the reason: </label>
              <textarea
                className={classes.messageTextarea}
                placeholder="Your message"
                defaultValue="Sorry, I have to cancel our appointment due to unexpected issues, thank you for understanding...❣️"
              />
            </>
          )}
          <div className={classes.modalButtonsContainer}>
            <MediumButton onClick={handleConfirm}>Confirm</MediumButton>
            <MediumButton onClick={(): void => setModalIsShown(false)}>Cancel</MediumButton>
          </div>
        </div>
      </MyModal>
    </motion.div>
  );
}

export default BookingCard;
