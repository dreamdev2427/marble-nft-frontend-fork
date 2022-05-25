import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import filterReducer from "./filterReducer";

const allReducers = combineReducers({
  uiData: uiReducer,
  filterData: filterReducer
});
export default allReducers;
export type State = ReturnType<typeof allReducers>;