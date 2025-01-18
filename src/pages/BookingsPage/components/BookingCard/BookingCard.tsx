import React from 'react';
import { JSX } from 'react/jsx-runtime';
import { motion } from 'framer-motion';
import { BookingsInterface } from '../../../../assets/interfaces/interfaces';
import classes from './BookingCard.module.scss';
import { formatDate, formatDuration, formatTime } from '../../../../assets/functions/functions';
import { weekDays } from '../../../../assets/constants/constants';

interface BookingCardProps {
  booking: BookingsInterface
}
function BookingCard({booking}:BookingCardProps): JSX.Element {
  return (
    <motion.div className={classes.cardContainer}>
      <p>{`${booking.name} ${booking.surname}`}</p>
      <p>{`${booking.procedureName}(${formatDuration(booking.duration)})`}</p>
      <p>{`${formatDate(booking.date)} (${weekDays[new Date(booking.date).getDay()]})`}</p>
      <p>{formatTime(booking.time)}</p>

      <div className={classes.contactDetails}>
        <a href={`mailto:${booking.email}`} >{booking.email}</a>
        <a href={`tel:${booking.telephoneNumber}`}>{booking.telephoneNumber}</a>
      </div>


    </motion.div>
  );
}

export default BookingCard;
