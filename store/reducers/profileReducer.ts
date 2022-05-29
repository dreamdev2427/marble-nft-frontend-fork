import { PROFILE_STATUS } from "../types";

const initialState = {
  profile_status: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_STATUS:
      return {
        ...state,
        profile_status: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
