import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RiArrowUpWideLine } from 'react-icons/ri';
import classes from './BookingsSearchFilter.module.scss';
import SearchInput from '../../../../../../components/SearchInput/SearchInput';
import { BookingsInterface, UsersDataInterface } from '../../../../../../assets/interfaces/interfaces';
import { queryClient } from '../../../../../../query';
import MediumButton from '../../../../../../UI/M-Button/MediumButton';
import MyDatePicker from '../../../../../../components/DatePicker/MyDatePicker';
import { useAppSelector } from '../../../../../../hooks/reduxHooks';
import { calcIsExpired } from '../../../../../../assets/functions/functions';

interface BookingsSearchFilterProps {
  setBookingsList: React.Dispatch<React.SetStateAction<BookingsInterface[] | undefined>>;
}
function BookingsSearchFilter({ setBookingsList }: BookingsSearchFilterProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const mastersData: UsersDataInterface | undefined = queryClient.getQueryData(['MastersData']);
  const [isSortByDate, setIsSortByDate] = useState<boolean>(false);
  const [showExpired, setShowExpired] = useState<boolean>(false);
  const pickedDate: string = useAppSelector((state) => state.bookingsListReducer.pickedDate);

  function handleTermChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value);
  }

  function handleToggleCalendar(): void {
    setIsSortByDate((prevState) => !prevState);
  }
  function toggleExpired(): void {
    setShowExpired((prevState) => !prevState);
  }
  useEffect((): void => {
    const result = mastersData?.booked.filter(
      (booking) =>
        booking.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.procedureName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBookingsList(result);
  }, [searchTerm]);
  // sort by date , sort by isExpired and
  // store bookings from query
  useEffect(() => {
    let list = mastersData?.booked.filter(
      (booking) =>
        booking.surname.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        booking.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        booking.procedureName.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    if (!showExpired) list = list?.filter((booking) => !calcIsExpired(booking.date, booking.time));
    if (pickedDate !== '') list = list?.filter((booking) => booking.date.includes(pickedDate));
    setBookingsList(list);
  }, [mastersData, showExpired, pickedDate, searchTerm]);

  return (
    <div className={classes.filterContainer}>
      <SearchInput className={classes.searchInput} value={searchTerm} onChange={handleTermChange} type="search" />
      <MediumButton className={classes.openCalendarButton} onClick={handleToggleCalendar}>
        Sort By Date
      </MediumButton>
      <motion.div
        animate={isSortByDate ? { y: 0, opacity: 1 } : { y: '-1500px', opacity: 0 }}
        exit={{ y: '-500px' }}
        transition={{ duration: 0.2 }}
        className={classes.calendarWrapper}
        onClick={handleToggleCalendar}
      >
        <MyDatePicker showButton={false} isBookingsPage />
        <button className={classes.closeButton}>
          <RiArrowUpWideLine size={15} />
        </button>
      </motion.div>
      <label>
        <input type="checkbox" onChange={toggleExpired} />
        <p>show history</p>
      </label>
    </div>
  );
}

export default BookingsSearchFilter;
