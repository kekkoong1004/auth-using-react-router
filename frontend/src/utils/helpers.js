import { redirect } from 'react-router-dom';

export function firstLetterToUppercase(word) {
  const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);

  return capitalizedWord;
}

export function getToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function getTokenValidityDuration() {
  let now = Date.now();
  let tokenGeneratedTime = localStorage.getItem('auth-duration');
  const timeRemaining = tokenGeneratedTime - now;

  if (timeRemaining <= 0) {
    return 'expired';
  }

  return timeRemaining;
}

export function getAuth() {
  const token = getToken();

  if (!token) return null;

  return token;
}

export function checkAuthLoader() {
  const auth = getAuth();

  if (!auth) {
    return redirect('/');
  }

  return null;
}

export function authFormLoader() {
  const auth = getAuth();

  if (auth) {
    return redirect('/');
  }

  return null;
}
