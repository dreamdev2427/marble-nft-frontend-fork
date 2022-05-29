import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import filterReducer from "./filterReducer";
import profileReducer from "./profileReducer";

const allReducers = combineReducers({
  uiData: uiReducer,
  filterData: filterReducer,
  profileData: profileReducer
});
export default allReducers;
export type State = ReturnType<typeof allReducers>;