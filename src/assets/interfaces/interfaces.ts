
export interface TreatmentsProps {
  img: string;
  procedureName: string;
  description: string;
  id: number;
  price: string;
  options: number[];
}
export interface UsersCoordsProps {
  lng: number;
  lat: number;
}
export interface ReviewProps {
  id: number;
  photo: string;
  name: string;
  comment: {header:string, text: string};
  rate: number;
  date: string;
  isVerified: boolean | undefined;
}

export interface BookingProcedureProps {
  procedureName:string,
  duration: number
}

export interface BookingCustomerDetailsProps {
  name:string,
  surname: string,
  telephoneNumber: string,
  email:string,
}
export interface ScheduleInterface{
  day: string,
  timeFrom: number[],
  timeTo: number[],
}

