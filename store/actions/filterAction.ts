import { FILTER_STATUS } from "../types";

export const setFilterData = (action, data) => async (dispatch) => {
  try {
    switch (action){
      case FILTER_STATUS:
        dispatch({
          type: action,
          payload: data,
        });
      break;
    }  
  } catch (error) {
    console.log(error)
  }
};