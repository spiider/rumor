import { authHeader, handleResponse } from './helper';
export const newsService = {
  listNews,
};

function listNews(token) {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(token)
  };

  return fetch(`http://localhost:3001/news/list`, requestOptions).then(handleResponse);
}

