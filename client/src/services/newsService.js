import { authHeader, handleResponse } from './helper';
import { URL } from '../constants';

const listNews = (token) => {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(token)
  };

  return fetch(`${URL}/news/list`, requestOptions).then(handleResponse);
}

const editNews = (token, title, content, id, status) => {
  const requestOptions = {
      method: (!id) ? 'POST' : 'PATCH',
      headers: authHeader(token),
      body: JSON.stringify({ title, content, id, status })
  };

  return fetch(`${URL}/news`, requestOptions).then(handleResponse);
}

export const newsService = {
  listNews,
  editNews,
}
