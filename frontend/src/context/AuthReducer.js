
const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAIL":
        return {
          user: null,
          isFetching: false,
          error: action.payload,
        };
      case "FOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            folowins: [...state.user.folowins, action.payload],
          },
        };
      case "UN_FOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            folowins: state.user.folowins.filter((followin) => followin !== action.payload),
          },
        };
      default:
        return state;
    }
}
export default AuthReducer;