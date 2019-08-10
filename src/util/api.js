/**
 * Requests API endpoint (URL), returns promise
 * @param {string} apiRoot - root of URL to request
 * @param {string} path - path of URL to request
 * @param {object} options - custom settings applied to request
 * @return {Promise} a Promise that resolves to a Response object
 */
export default function callApi(apiRoot, path, options) {
  const endpoint = apiRoot + path;
  const requestOptions = {
    ...options,
  };

  return fetch(endpoint, requestOptions)
    .then(parseJSON)
    .catch(error => Promise.reject(error));
}

/**
 * Parses JSON returned by network request
 * @param  {Response} response - Response from network request
 * @return {object} Parsed JSON from request
 */
function parseJSON(response) {
  return response.json();
}