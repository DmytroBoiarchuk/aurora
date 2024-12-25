import { combineReducers } from 'redux';
import ratingReducer from './modules/ratingReducer/reducer';
import bookingReducer from './modules/bookingReducer/reducer';
import workingScheduleReducer from './modules/workingScheduleReducer/reducer';


export default combineReducers({
  ratingReducer,
  bookingReducer,
  workingScheduleReducer,
});
