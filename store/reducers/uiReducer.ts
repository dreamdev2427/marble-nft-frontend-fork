import { NFT_COLUMN_COUNT, UI_ERROR } from "../types";

const initialState = {
  nft_column_count: 3,
  loading: true,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case NFT_COLUMN_COUNT:
      return {
        ...state,
        nft_column_count: action.payload,
        loading: false,
      };

    case UI_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default uiReducer;
