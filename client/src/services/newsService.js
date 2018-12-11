import { authHeader, handleResponse } from './helper';
import { URL } from '../constants';

const listNews = (token) => {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(token)
  };

  return fetch(`${URL}/news/list`, requestOptions).then(handleResponse);
}

const getDrafts = (token) => {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(token)
  };

  return fetch(`${URL}/news/drafts`, requestOptions).then(handleResponse);
}

const editNews = (token, title, content, id, status) => {
  const requestOptions = {
      method: (!id) ? 'POST' : 'PATCH',
      headers: authHeader(token),
      body: JSON.stringify({ title, content, id, status })
  };

  return fetch(`${URL}/news`, requestOptions).then(handleResponse);
}

const addComment = (token, comment, id) => {
  const requestOptions = {
      method: 'POST',
      headers: authHeader(token),
      body: JSON.stringify({ comment })
  };

  return fetch(`${URL}/news/comment/${id}`, requestOptions).then(handleResponse);
}

const getNews = (token, id) => {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(token),
  };

  return fetch(`${URL}/news/${id}`, requestOptions).then(handleResponse);
}

const getOneDraft = (token, id) => {
  const requestOptions = {
      method: 'GET',
      headers: authHeader(token),
  };

  return fetch(`${URL}/news/edit/${id}`, requestOptions).then(handleResponse);
}

const getComments = (id) => {
  const requestOptions = {
      method: 'GET',
  };

  return fetch(`${URL}/news/comments/${id}`, requestOptions).then(handleResponse);
}


export const newsService = {
  addComment,
  listNews,
  editNews,
  getNews,
  getComments,
  getDrafts,
  getOneDraft,
}
