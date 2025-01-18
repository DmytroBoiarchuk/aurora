import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookingsInterface, UsersDataInterface } from '../../assets/interfaces/interfaces';
import { fetchJsonData } from '../../assets/functions/functions';
import BookingCard from './components/BookingCard/BookingCard';
import Block from '../../UI/Block/Block';
import classes from './BookingPage.module.scss';

function compareDates(booking1: BookingsInterface, booking2: BookingsInterface): number {
  const date1 = new Date(booking1.date).getTime();
  const date2 = new Date(booking2.date).getTime();

  if (date1 === date2) {
    return booking1.time - booking2.time;
  }
  return date1 - date2;
}

function BookingsPage(): JSX.Element {
  const { data } = useQuery<UsersDataInterface>({
    queryKey: ['MastersData'], // add masters ID to keys array to cache loaded master
    queryFn: fetchJsonData,
  });
  console.log(data);
  return (
    <Block classNames={classes.bookingsContainer}>
      {data?.booked
        .sort((a, b) => compareDates(a, b))
        .map((booking) => <BookingCard key={booking.email} booking={booking} />)}
    </Block>
  );
}

export default BookingsPage;
