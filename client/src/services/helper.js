export function authHeader(token) {
  return (token) ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type': 'application/json' };
}

export function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              localStorage.removeItem('state');
              window.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}
