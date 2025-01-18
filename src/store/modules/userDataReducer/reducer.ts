import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDataReducerInterface } from '../../../assets/interfaces/reduxInterfaces';

const initialState: UserDataReducerInterface = {
  id: 9999999999,
  photo: '/valeriia_profile_photo.jpg',
  name: 'Valeriia Voitenko',
  description:
    'Valeriia is a highly skilled beauty professional specializing in lash and brow lamination, meticulous\n' +
    '            eyebrow shaping, and advanced electrolysis hair removal. With a dedication to precision and an eye for\n' +
    '            detail, Valeriia delivers exceptional, personalized beauty treatments that enhance natural features and\n' +
    '            ensure client satisfaction.',
  address: '19 Rosemount Place, AB25 2XA',
  currency: '£',
  clientsId: [87455122154, 9979446655, 64546546465, 100000000],
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setPhoto(state, action:PayloadAction<string>) {
      state.photo = action.payload;
    },
    setName(state, action:PayloadAction<string>) {
      state.name = action.payload;
    },
    setDescription(state, action:PayloadAction<string>) { //!!!
      state.description = action.payload;
    },
    setCurrency(state, action:PayloadAction<string>) {
      state.currency = action.payload;
    },
    setClientsId(state, action:PayloadAction<number>) {
      state.clientsId?.push(action.payload);
    },
    setAddress(state, action:PayloadAction<string>) {
      state.address = action.payload;
    }
  },
});

export const { setPhoto, setName,setAddress } = userDataSlice.actions;

export default userDataSlice.reducer;
