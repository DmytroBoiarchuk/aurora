import React, { useEffect, useState } from 'react';
import classes from './BookingsSearchFilter.module.scss';
import SearchInput from '../../../../components/SearchInput/SearchInput';
import { BookingsInterface, UsersDataInterface } from '../../../../assets/interfaces/interfaces';
import { queryClient } from '../../../../query';

interface BookingsSearchFilterProps {
  setBookingsList: React.Dispatch<React.SetStateAction<BookingsInterface[] | undefined>>;
}
function BookingsSearchFilter({ setBookingsList }: BookingsSearchFilterProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const mastersData: UsersDataInterface | undefined = queryClient.getQueryData(['MastersData']);

  function handleTermChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value);
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
  return <SearchInput className={classes.searchInput} value={searchTerm} onChange={handleTermChange} type="search" />;
}

export default BookingsSearchFilter;
