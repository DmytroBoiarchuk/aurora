import { TreatmentsReducerInterface } from '../../../assets/interfaces/reduxInterfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TreatmentsProps } from '../../../assets/interfaces/interfaces';

const initialState:TreatmentsReducerInterface = {
  treatments: [
    {
      img: '/lash-lift.jpg',
      description:
        'Lash bla bla bla bla bla , Lash bla bla bla bla , bla. Lush bla bla bla bla Lash bla bla bla bla bla ush bla bla bla bla bla Lash bla bla bla bla bla , Lash bla bla bla bla , bla. Lush bla bla bla bla Lash bla bla bla bla bla ush bla bla bla bla bla Lash bla bla bla bla bla , Lash bla bla bla bla , bla. Lush bla bla bla bla Lash bla bla bla bla bla ush bla bla bla bla bla , Lash bla bla bla bla , bla. Lash bla bla bla bla blaLush bla bla bla bla bla',
      id: 0,
      procedureName: 'Lush Lift',
      price: '30',
      options: [1],
    },
    {
      img: '/brow_lami.jpg',
      description:
        'Brow bla bla bla bla bla , Brow bla bla bla bla , bla. Brow bla bla bla bla Brow bla bla bla bla bla',
      id: 1,
      procedureName: 'Brow Lami',
      price: '30',
      options: [1],
    },
    {
      img: '/electrolysis.jpg',
      description: 'Permanent hair removal',
      id: 2,
      procedureName: 'Electrolysis',
      price: '50',
      options: [0.5, 1, 1.5, 2],
    },
    {
      img: '/lashAndBrow.jpeg',
      description: 'Two go cheaper',
      id: 3,
      procedureName: 'Lash + Brow Laminate',
      price: '50',
      options: [1],
    },
    {
      img: '/lashAndBrow.jpeg',
      description: 'Two go cheaper',
      id: 4,
      procedureName: 'Lash + Brow Laminate2',
      price: '502',
      options: [1],
    },
  ],
};

const treatmentsSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {
    createTreatment(state: TreatmentsReducerInterface, action: PayloadAction<TreatmentsProps>) {
      state.treatments.push(action.payload);
    },
    editTreatment(state: TreatmentsReducerInterface, action: PayloadAction<{id: number, treatment: TreatmentsProps}>) {
      state.treatments = state.treatments.map( tr => tr.id === action.payload.id ? action.payload.treatment : tr );
    }

  }
});

export const {createTreatment, editTreatment} = treatmentsSlice.actions;

export default treatmentsSlice.reducer;
