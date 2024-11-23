import React from 'react';
import classes from './BookingConfirmed.module.scss';
import MediumButton from "../../../../../../UI/M-Button/MediumButton";

function BookingConfirmed({setIsBookingConfirmed}  :  React.Dispatch<React.SetStateAction<boolean>>):JSX.Element {
    return (
        <div className={classes.bookingConfirmedContainer}>
            <h1>Your Booking has been confirmed!</h1>
            <p>Thank you! Master will be contacting you soon! ❤</p>
            <MediumButton onClick={(): void=>setIsBookingConfirmed(false)}>Okey</MediumButton>
        </div>
    );
}

export default BookingConfirmed;
