import { ReviewProps, ScheduleInterface, TreatmentsProps } from './interfaces';

export interface StateInterface {
  ratingReducer: RatingReducerInterface;
  bookingReducer: BookingInterface;
  workingScheduleReducer: WorkingScheduleReducerInterface;
}

export interface RatingReducerInterface {
  rating: number
}

export interface BookingInterface {
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

export interface ReviewsReducerInterface {
  reviews: ReviewProps[]
}

export interface UserDataReducerInterface {
  id: number;
  photo?: string | undefined;
  name: string;
  description: string;
  currency: string;
  address?: string;
  clientsId?: number[] | undefined;
}
export interface TreatmentsReducerInterface {
  treatments: TreatmentsProps[];
}
