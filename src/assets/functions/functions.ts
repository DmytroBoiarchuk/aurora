import usersData from '../../database/usersData';
import { BookingReducerInterface } from '../interfaces/reduxInterfaces';

export function formatTime(timeToFormat: number | string): string {
    const hours: number = Math.floor(+timeToFormat);
    const minutes: number = (+timeToFormat - hours) * 60;
    return `${hours < 10? `0${hours}`: hours}:${minutes === 0? '00' : minutes }`;
}

export function formatDuration(timeToFormat:number | string): string {
    const hours: number = Math.floor(+timeToFormat);
    const minutes: number = (+timeToFormat - hours) * 60;
    return `${hours? `${hours} ${hours>1? 'hours' : 'hour'}`:''} ${minutes === 0? '' : `${minutes} minutes` } `;
}

export function formatDate (dateString: string): string {
    const locale =  'en-UK';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);
};

export function findAvailableTime(bookingData: BookingReducerInterface, date: string): number[] {
  const availableTime = usersData.workingDates.find((day) => day.day === date);
  const timesArray: number[] = [];
  if (availableTime)
    for (let i = 0; i < availableTime.timeFrom.length; i++) {
      const windows: number = availableTime.timeTo[i] - availableTime.timeFrom[i];
      for (let j = 0; j < windows; j += 0.5) {
        if (!(availableTime.timeFrom[i] + bookingData.duration + j > availableTime.timeTo[i]))
          timesArray.push(availableTime.timeFrom[i] + j);
      }
    }
  return timesArray;
}
