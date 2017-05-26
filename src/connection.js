import { ReactConnect } from 'fql-react';
import localStorage from './localStorage';

const isProduction = process.env.NODE_ENV === 'production'
const instanceURL = isProduction ? window.location.hostname : process.env.REACT_APP_INSTANCE;
const localStorageKey = instanceURL + '/login';

function getInstanceName(url) {
  url = url || window.location.hostname;
  const match = url.match(/([^./]+)\.flur\.ee/)[1];
  return match || process.env.REACT_APP_INSTANCE;
}

const savedSession = localStorage.getItem(localStorageKey) || {};

const conn = ReactConnect({
  log: false,
  url: instanceURL,
  instance: getInstanceName(instanceURL),
  token: savedSession.token,
  user: savedSession.user,
  anonymous: savedSession.anonymous,
  workerUrl: '/fqlClient.js'
});

function signOut(cb) {
  localStorage.removeItem(localStorageKey);
  conn.logout(cb);
  return true;
}

// rememberMe is a boolean where the user token is stored locally,
// presumably if the user indicates yes to Remember Me?
function login(user, password, rememberMe, cb) {
  conn.login(user, password, function (result) {

    if (result.status === 200 && rememberMe) {
      localStorage.setItem(localStorageKey, result.body);
    }
    cb(result);
  });
}

module.exports = { conn, login, signOut };
