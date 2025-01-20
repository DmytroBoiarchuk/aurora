import React, { useMemo } from 'react';
import { IoCallOutline, IoMailOutline } from 'react-icons/io5';
import classes from '../BookingCard.module.scss';
import { formatDate, formatDuration, formatTime } from '../../../../../assets/functions/functions';
import { weekDays } from '../../../../../assets/constants/constants';
import { BookingsInterface } from '../../../../../assets/interfaces/interfaces';

function BookingCardTable({booking} : {booking: BookingsInterface}): JSX.Element {
  const timeTo: number = useMemo(()=> booking.time+booking.duration, [booking.time, booking.duration]);
  return (
    <table>
      <tbody>
      <tr>
        <th id={classes.nameCol}>Name</th>
        <th>Procedure</th>
        <th>Time</th>
        <th id={classes.contactCol}>Contact Details</th>
      </tr>
      <tr>
        <td id={classes.nameCol}>
          <span>{`${booking.name} ${booking.surname}`}</span>
        </td>
        <td>
          <span>{booking.procedureName}</span>
          <span>{formatDuration(booking.duration)}</span>
        </td>
        <td>
          <span>{formatDate(booking.date)}</span>
          <span>{weekDays[new Date(booking.date).getDay()]}</span>
          <span className={classes.time}>{`${formatTime(booking.time)}-${formatTime(timeTo > 24 ? timeTo -24 : timeTo)}`}</span>
        </td>
        <td id={classes.contactCol} className={classes.contactDetails}>
              <span>
                <span>{booking.email}</span>
                <a href={`mailto:${booking.email}`}>
                  <IoMailOutline />
                </a>
              </span>
          <span>
                <span>{booking.telephoneNumber}</span>
                <a href={`tel:${booking.telephoneNumber}`}>
                  <IoCallOutline />
                </a>
              </span>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

export default BookingCardTable;
