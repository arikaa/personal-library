import { userService } from '../services/user.service';
import { history } from '../helpers/history';

export const userConstants = {
  REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
  REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

  LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

  LOGOUT: 'USERS_LOGOUT',
  UPDATE: 'USERS_UPDATE',

  DELETE_REQUEST: 'USERS_DELETE_REQUEST',
  DELETE_SUCCESS: 'USERS_DELETE_SUCCESS',
  DELETE_FAILURE: 'USERS_DELETE_FAILURE',

  ADD_BOOK: 'USERS_ADD_BOOK',
  ADD_BOOK_SUCCESS: 'USERS_ADD_BOOK_SUCCESS',
  ADD_BOOK_FAILURE: 'USERS_ADD_BOOK_FAILURE',

  ADD_NOTE: 'USERS_ADD_NOTE',
  ADD_NOTE_SUCCESS: 'USERS_ADD_NOTE_SUCCESS',
  ADD_NOTE_FAILURE: 'USERS_ADD_NOTE_FAILURE',
};

function login(username, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ username }));
    userService.login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
          history.push('/');
        },
        (error) => {
          dispatch(failure(error.toString()));
        },
      );
  };
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  function request(user) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(user));

    userService.register(user)
      .then(
        (user) => {
          dispatch(success());
          history.push('/login');
        },
        (error) => {
          dispatch(failure(error.toString()));
        },
      );
  };
}

function addBook(user) {
  function request(user) { return { type: userConstants.ADD_BOOK, user }; }
  function success(user) { return { type: userConstants.ADD_BOOK_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.ADD_BOOK_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(user));
    userService.update(user)
      .then(() => {
        dispatch(success(user));
        history.push('/');
      },
      (error) => {
        dispatch(failure(error.toString()));
      });
  };
}

function addNote(user) {
  function request(user) { return { type: userConstants.ADD_NOTE, user }; }
  function success(user) { return { type: userConstants.ADD_NOTE_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.ADD_NOTE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(user));
    userService.update(user)
      .then(() => {
        dispatch(success(user));
        history.push('/');
      },
      (error) => {
        dispatch(failure(error.toString()));
      });
  };
}

function _delete(id) { // eslint-disable-line no-underscore-dangle
  function request(id) { return { type: userConstants.DELETE_REQUEST, id }; }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id }; }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error }; }

  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString())),
      );
  };
}

export const userActions = {
  addBook,
  login,
  logout,
  register,
  addNote,
  delete: _delete,
};
