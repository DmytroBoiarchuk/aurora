import { combineReducers } from 'redux';
import reviewingRatingReducer from './modules/ratingReducer/reducer';
import bookingReducer from './modules/bookingReducer/reducer';
import workingScheduleReducer from './modules/workingScheduleReducer/reducer';
import reviewsReducer from './modules/reviewsReducer/reducer';
import userDataReducer from './modules/userDataReducer/reducer';
import treatmentsReducer from './modules/treatmentsReducer/reducer';

export default combineReducers({
  reviewingRatingReducer,
  bookingReducer,
  workingScheduleReducer,
  reviewsReducer,
  userDataReducer,
  treatmentsReducer
});
