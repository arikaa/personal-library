
// manages the state related to the login/logout actions

import { userConstants } from '../actions/user.actions';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.UPDATE:
      return {
        user: action.user,
      };
    case userConstants.ADD_BOOK:
      return {};
    case userConstants.ADD_BOOK_SUCCESS:
      return { user: action.user };
    case userConstants.ADD_BOOK_FAILURE:
      return {};
    case userConstants.ADD_NOTE:
      return {};
    case userConstants.ADD_NOTE_SUCCESS:
      return { user: action.user };
    case userConstants.ADD_NOTE_FAILURE:
      return {};
    default:
      return state;
  }
}
