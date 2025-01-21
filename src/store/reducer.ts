import { combineReducers } from 'redux';
import reviewingRatingReducer from './modules/ratingReducer/reducer';
import bookingReducer from './modules/bookingReducer/reducer';
import workingScheduleReducer from './modules/workingScheduleReducer/reducer';
import reviewsReducer from './modules/reviewsReducer/reducer';
import userDataReducer from './modules/userDataReducer/reducer';
import treatmentsReducer from './modules/treatmentsReducer/reducer';
import timeForAllDaysReducer from './modules/setTimeForAllDaysModalReducer/reducer';
import bookingsListReducer from './modules/bookingsListReducer/reducer';

export default combineReducers({
  reviewingRatingReducer,
  timeForAllDaysReducer,
  bookingReducer,
  workingScheduleReducer,
  reviewsReducer,
  userDataReducer,
  treatmentsReducer,
  bookingsListReducer
});
