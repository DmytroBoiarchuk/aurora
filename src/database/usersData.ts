import { TreatmentsProps, ReviewProps, ScheduleInterface } from '../assets/interfaces/interfaces';

interface UsersDataInterface {
  id: number;
  photo: string;
  name: string;
  description: string;
  treatments: TreatmentsProps[];
  address: string;
  reviews: ReviewProps[];
  clientsId: number[];
  workingDates: ScheduleInterface[];
  currency: string;
}
interface LoggedInUserInterface {
  id: number;
  photo: string;
  name: string;
}

const usersData: UsersDataInterface = {
  id: 9999999999,
  photo: '/valeriia_profile_photo.jpg',
  name: 'Valeriia Voitenko',
  description:
    'Valeriia is a highly skilled beauty professional specializing in lash and brow lamination, meticulous\n' +
    '            eyebrow shaping, and advanced electrolysis hair removal. With a dedication to precision and an eye for\n' +
    '            detail, Valeriia delivers exceptional, personalized beauty treatments that enhance natural features and\n' +
    '            ensure client satisfaction.',
  treatments: [
    {
      img: '/lash-lift.jpg',
      description:
        'Lash bla bla bla bla bla , Lash bla bla bla bla , bla. Lush bla bla bla bla Lash bla bla bla bla bla ush bla bla bla bla bla Lash bla bla bla bla bla , Lash bla bla bla bla , bla. Lush bla bla bla bla Lash bla bla bla bla bla ush bla bla bla bla bla Lash bla bla bla bla bla , Lash bla bla bla bla , bla. Lush bla bla bla bla Lash bla bla bla bla bla ush bla bla bla bla bla , Lash bla bla bla bla , bla. Lash bla bla bla bla blaLush bla bla bla bla bla',
      id: 1,
      procedureName: 'Lush Lift',
      price: '30£',
      options: [1],
    },
    {
      img: '/brow_lami.jpg',
      description:
        'Brow bla bla bla bla bla , Brow bla bla bla bla , bla. Brow bla bla bla bla Brow bla bla bla bla bla',
      id: 2,
      procedureName: 'Brow Lami',
      price: '30£',
      options: [1],
    },
    {
      img: '/electrolysis.jpg',
      description: 'Permanent hair removal',
      id: 3,
      procedureName: 'Electrolysis',
      price: '50£/h',
      options: [0.5, 1, 1.5, 2],
    },
    {
      img: '/lashAndBrow.jpeg',
      description: 'Two go cheaper',
      id: 4,
      procedureName: 'Lash + Brow Laminate',
      price: '50£',
      options: [1],
    },
  ],
  address: '19 Rosemount Place, AB25 2XA',
  reviews: [
    {
      id: 9979446655,
      photo: '/no-photo-img.jpg',
      name: 'Dmytro Boiarchuk',
      comment: {
        header: 'Awsome',
        text:
          'Fusce nibh dolor, sollicitudin eget rhoncus ut, elementum at turpis. Nullam vel purus ligula. Nullam vitae vulputate nibh. In sit amet urna ac arcu semper accumsan. Etiam dictum libero in cursus rhoncus. Duis eget ultricies arcu. Donec at ullamcorper elit. Fusce nec interdum justo, vel iaculis justo. Donec in felis ut turpis elementum commodo. Nunc eleifend ante a porttitor maximus. Proin tempus lectus at augue lacinia, ut tristique leo laoreet. Morbi sed sem urna. Aliquam ut odio congue, rhoncus orci a, pretium urna. In hac habitasse platea dictumst. Maecenas nec massa ex.\n' +
          '\n' +
          'Nam dignissim tempus faucibus. Duis sed lectus viverra metus dignissim pretium. Sed tincidunt vestibulum justo, quis tristique metus congue vitae. Nullam sed malesuada dolor, ut tempor felis. Curabitur turpis arcu, tempor vel mattis ut, laoreet ac dolor. Aenean ut tincidunt eros, ac rhoncus elit. Donec pellentesque fringilla est, sit amet scelerisque elit bibendum a. Fusce varius hendrerit dictum. Cras non urna vel erat mattis feugiat at eu mi. Phasellus vitae neque lobortis, vulputate felis et, gravida sem.\n' +
          '\n' +
          'Vivamus sit amet metus sed diam volutpat pulvinar a eu magna. Pellentesque varius dignissim porta. In vel magna id velit auctor porta. In hac habitasse platea dictumst. Aenean sed congue arcu. Ut at condimentum nibh. Sed tincidunt nec mauris eu lobortis. Aliquam nibh orci, viverra congue congue molestie, accumsan sed tortor. Aliquam non justo eget metus finibus facilisis quis vitae sem. Vivamus vestibulum ullamcorper dui a feugiat. Cras consequat mauris dolor, ut efficitur tellus ultrices vitae. Donec eros nibh, congue vel sapien ac, viverra dictum mauris. Mauris quis urna nunc. Sed commodo tortor at fringilla eleifend. Nam congue, nibh vitae auctor iaculis, nibh purus pretium massa, vel vulputate lectus nisi sed arcu.',
      },
      rate: 5,
      date: '2024-11-16T14:40:23.000Z',
      isVerified: true,
    },
    {
      id: 87455122154,
      photo: '/example-girl-photo2.jpg',
      name: 'Galina Pizdova',
      comment: {
        header: 'Nice',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor porttitor tellus. Donec quis ipsum semper, convallis magna non, maximus.',
      },
      rate: 4,
      date: '2024-11-15T10:20:23.000Z',
      isVerified: true,
    },
    {
      id: 64546546465,
      photo: '/example-girl-photo.png',
      name: 'Natali Koncha',
      comment: {
        header: 'Verrryyyy gooood',
        text: 'Mauris sed dolor nec turpis ornare mollis id quis elit. Nunc vel tortor tellus. Fusce pretium lacinia finibus. Pellentesque tincidunt lacus at scelerisque ornare.',
      },
      rate: 4.5,
      date: '2024-10-01T23:13:23.000Z',
      isVerified: true,
    },
  ],
  clientsId: [87455122154, 9979446655, 64546546465, 100000000],
  workingDates: [
    { day: '2024-12-28', timeFrom: [14, 15.5], timeTo: [15, 22] },
    { day: '2024-12-01', timeFrom: [14], timeTo: [22] },
    { day: '2024-12-29', timeFrom: [9], timeTo: [23.5] },
  ],
  currency: '£',
};

export const loggedInUserData: LoggedInUserInterface = {
  id: 100000000,
  name: 'Gnida Ebanaya',
  photo: '/no-photo-img.jpg',
};
export default usersData;
