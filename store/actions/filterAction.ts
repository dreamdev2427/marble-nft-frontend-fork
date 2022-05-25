import { FILTER_STATUS } from "../types"
import { Dispatch, AnyAction } from "redux"

export const setFilterData = (action: string, data) => async (dispatch) => {
  console.log("dispatch", action, data)
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