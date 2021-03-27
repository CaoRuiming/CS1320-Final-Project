import axios from 'axios';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
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
    console.log('Retreived results:', result);

    // // testing for login/auth
    // const csrf = await axiosInstance.get('/csrf');
    // console.log(csrf);
    // const login = await axiosInstance.post('/login', {username: 'root', password: 'password'});
    // const user = await axiosInstance.get('/users/1');
    // console.log(user);

    return result;
  }
}
