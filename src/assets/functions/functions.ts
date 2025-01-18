import { BookingReducerInterface } from '../interfaces/reduxInterfaces';
import { ScheduleInterface, UsersDataInterface } from '../interfaces/interfaces';

export function formatTime(timeToFormat: number | string): string {
    const hours: number = Math.floor(+timeToFormat);
    const minutes: number = (+timeToFormat - hours) * 60;
    return `${hours < 10? `0${hours}`: hours}:${minutes === 0? '00' : minutes }`;
}

export function formatDuration(timeToFormat:number | string): string {
    const hours: number = Math.floor(+timeToFormat);
    const minutes: number = (+timeToFormat - hours) * 60;
    return `${hours? ` ${hours} ${hours>1? 'hours' : 'hour'}`:''} ${minutes === 0? '' : `${minutes} minutes` } `;
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

export function findAvailableTime(bookingData: BookingReducerInterface, date: string, workingDates: ScheduleInterface[]): number[] {
  const availableTime = workingDates.find((day) => day.day === date);
  const timesArray: number[] = [];
  if (availableTime)
    for (let i = 0; i < availableTime.timeFrom.length; i++) {
      const windows: number = availableTime.timeTo[i] - availableTime.timeFrom[i];
      for (let j = 0; j < windows; j += 0.25) {
        if (!(availableTime.timeFrom[i] + bookingData.duration + j > availableTime.timeTo[i]))
          timesArray.push(availableTime.timeFrom[i] + j);
      }
    }
  return timesArray;
}

export function debounce<F extends (...args: any[]) => void>(func : F, wait: number): (...args: Parameters<F>) => void  {
  let timeout : ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(()=>func(...args), wait);
  };
}

export const fetchJsonData = async (): Promise<UsersDataInterface> => {
  const response = await fetch('src/database/usersData.json');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
