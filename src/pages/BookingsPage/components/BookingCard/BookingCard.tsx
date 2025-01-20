import React, { useState } from 'react';
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
function BookingCard({ booking }: BookingCardProps): JSX.Element {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(booking.isConfirmed);
  const [modalIsShown, setModalIsShown] = useState<boolean>(false);
  const [modalState, setModalState] = useState<'confirm' | 'cancel' | ''>('');

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
       if(!variables.isDeleting) setIsConfirmed(false);
       // show Error
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['MastersData'] }); // maybe not needed ?
    // },
  });

  function handleConfirm(): void {
    setModalIsShown(false);
    if (modalState === 'cancel') {
      setTimeout(() => mutate({ bookingId: booking.email, isDeleting: true }), 300);
    } else if (modalState === 'confirm') {
      setTimeout(() => mutate({ bookingId: booking.email, isDeleting: false }), 300);
      setIsConfirmed(true);
    }
    // send email to customer & request to server to set confirmed ( if response is not OK -> set isConfirmed ( false ) )
  }
  function handleClickButton(modal: 'confirm' | 'cancel' | ''): void {
    setModalState(modal);
    setModalIsShown(true);
  }
  return (
    <motion.div
      layout="position"
      className={classes.cardContainer}
      exit={{ x: '-2000px' }}
      transition={{ duration: 0.4 }}
    >
      <BookingCardTable booking={booking}/>
      <div className={classes.bookingButtonsContainer}>
        <button onClick={(): void => handleClickButton('cancel')} className={classes.cancelButton}>
          Cancel
        </button>
        <SmallButton disabled={isConfirmed} onClick={(): void => handleClickButton('confirm')}>
          <GiConfirmed id={isConfirmed ? classes.confirmed : ''} size={45} />
        </SmallButton>
      </div>
      <MyModal modalIsShown={modalIsShown} setModalIsShown={setModalIsShown}>
        <div className={classes.modalBody}>
          <p>{`Are you sure to ${modalState === 'confirm' ? 'confirm' : 'cancel'}?`}</p>
          {modalState !== 'confirm' && (
            <>
              <label>Tell customer the reason: </label>
              <textarea className={classes.messageTextarea} placeholder="Your message" defaultValue='Sorry, I have to cancel our appointment due to unexpected issues, thank you for understanding...❣️' />
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
