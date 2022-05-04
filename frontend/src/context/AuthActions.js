export const loginStart = (userCredentiel) => ({
    type: "LOGIN_START"
})

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAIL",
  payload: error
});
export const follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});
export const unFollow = (userId) => ({
  type: "UN_FOLLOW",
  payload: userId,
});
