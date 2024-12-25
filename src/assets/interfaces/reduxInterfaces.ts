import { ScheduleInterface } from './interfaces';

export interface StateInterface {
  ratingReducer: RatingReducerInterface;
  bookingReducer: BookingReducerInterface;
  workingScheduleReducer: WorkingScheduleReducerInterface;
}

export interface RatingReducerInterface {
  rating: number
}

export interface BookingReducerInterface {
  name: string;
  surname: string;
  telephoneNumber: string;
  email: string;
  date: string;
  time: string;
  procedureName: string;
  duration: number;
}

export interface WorkingScheduleReducerInterface {
  customWorkingDaysSchedule: boolean[];
  chosenDays: ScheduleInterface[]
}
