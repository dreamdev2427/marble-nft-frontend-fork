import { FILTER_STATUS } from "../types";

const initialState = {
  filter_status: [],
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_STATUS:
      return {
        ...state,
        filter_status: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
