
// encapsulates all backend api calls for performing operations on user data
import { authHeader } from '../helpers/auth-header';

const apiUrl = 'http://localhost:3001';

// remove user from local storage to log the user out
function logout() {
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // login successful if jwt token in response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    });
}

function getById(id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: 'PUT',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  return fetch(`${apiUrl}/users/${user._id}`, requestOptions) // eslint-disable-line no-underscore-dangle
    .then(handleResponse)
    .then(() => {
      // update the user when successful
      localStorage.setItem('user', JSON.stringify(user));
    });
}

function _delete(id) { // eslint-disable-line no-underscore-dangle
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };

  return fetch(`${apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

export const userService = {
  login,
  logout,
  register,
  getById,
  update,
  delete: _delete,
};
