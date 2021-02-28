import axios from 'axios';

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
    return result;
  }
}
