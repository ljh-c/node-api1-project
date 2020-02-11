// reducers/index.js

const initialState = {
  users: null,
  isFetching: false
};

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_USERS_START':
      return {
        ...state,
        isFetching: true
      };

    default:
      return state;
  }
};