import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewsReducerInterface } from '../../../assets/interfaces/reduxInterfaces';
import { ReviewProps } from '../../../assets/interfaces/interfaces';

const initialState: ReviewsReducerInterface = {
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
};
const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setNewPost: (state, action: PayloadAction<ReviewProps>) => {
      state.reviews.push(action.payload);
    }

  }
});

export const {setNewPost} = reviewSlice.actions;
export default reviewSlice.reducer;
