import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: `${window.location.origin}/api/v0/`,
  timeout: 300000,
});

/**
 * Class that bundles static utility functions for interacting with the API.
 */
export default class ApiService {
  /**
   * Async function that calls the API.
   * @param {Object} options query parameters for request to API
   * @returns {Promise} Promise that will return the value returned by the API
   */
  static async test(options={}) {
    const parameters = { params: { ...options } };
    const result = await axiosInstance.get('/test', parameters);
    return result;
  }

  /**
   * Retreives CSRF token from API server. Token is automatically stored and
   * send by Axios. CSRF must be set for POST requests to the API.
   */
  static async getCsrf() {
    await axiosInstance.get('/csrf');
  }

  /**
   * Logs in a user given a username and password.
   * @param {*} username the username (usually email address)
   * @param {*} password the password
   */
  static async login(username, password) {
    return axiosInstance.post('/login', { username, password });
  }
}
