import { Dispatch, AnyAction } from "redux"
import { NFT_COLUMN_COUNT, UI_ERROR } from "../types"

export const setUIData = (action: string, data: number) => async (dispatch: Dispatch<AnyAction>) => {
  try {
    switch (action){
      case NFT_COLUMN_COUNT:
        dispatch({
          type: action,
          payload: data,
        });
      break;
    }  
  } catch (error) {
    dispatch({
      type: UI_ERROR,
      payload: "error message",
    });
  }
};