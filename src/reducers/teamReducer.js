import { TEAM_LOADING, TEAM_SUCCESS, TEAM_FAIL } from '../actions/types';
const initialState = {
  type: '',
  loading: false,
  data: null,
  error: null,
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEAM_LOADING:
      return {
        ...state,
        type: '',
        loading: true,
      };
    case TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
        type: action.action,
      };
    case TEAM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        type: '',
      };
    default:
      return state;
  }
};
export default teamReducer;