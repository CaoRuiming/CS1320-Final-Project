import axios from 'axios';
import {
  mockUser, mockCourse, mockCoursePosts, mockPost, mockCourseTags, mockTag
} from './mocks';

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: `${window.location.origin}/api/v0/`,
  timeout: 300000,
});

// toggle to true for frontend dev purposes only
const noBackend = false;

async function genericGet(url) {
  const res = axiosInstance.get(url);
  return (await res).data;
}

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
    if (noBackend) {
      console.log('noBackend enabled');
      return 'noBackend';
    }
    const parameters = { params: { ...options } };
    const result = await axiosInstance.get('/test', parameters);
    return result;
  }

  /**
   * Retreives CSRF token from API server. Token is automatically stored and
   * send by Axios. CSRF must be set for POST requests to the API.
   */
  static async getCsrf() {
    if (!noBackend) {
      await genericGet('/csrf');
    }
  }

  /**
   * Logs in a user given a username and password.
   * @param {String} username the username (usually email address)
   * @param {String} password the password
   * @returns user object of logged in user
   */
  static async login(username, password) {
    if (noBackend) {
      return mockUser;
    }
    const res = await axiosInstance.post('/login', { username, password });
    return res.data;
  }

  
  /**
   * Logout current user  
   * @returns Success messages, otherwise throws error 
   */
   static async logout() {
    const res = await axiosInstance.post('/logout');
    return res.data;
  }

  /**
   * Get user data for currently logged in user. Throws error if not logged in.
   * @returns user object of logged in user, if applicable
   */
  static async checkLogin() {
    if (noBackend) {
      return mockUser;
    }
    return await genericGet('/checkLogin');
  }

  /**
   * Creates new user account using given data.
   * @param {Object} newUserData mapping of new post properties with values
   * @returns newly created user
   */
  static async createUser(newUserData) {
    const res = await axiosInstance.post('/users/create', newUserData);
    return res.data;
  }

  /**
   * Returns list of all active courses that a student can join.
   * @returns list of all active courses
   */
  static async getCourses() {
    if (noBackend) {
      return [mockCourse];
    }
    return await genericGet('/courses');
  }

  /**
   * Return course data given an ID.
   * @param {Integer|String} courseId ID of course as string or int
   * @returns course object corresponding to courseId
   */
  static async getCourse(courseId) {
    if (noBackend) {
      return mockCourse;
    }
    return await genericGet(`/courses/${courseId}`);
  }

  /**
   * Adds a student to an exixting course.
   * @param {Integer|String} courseId ID of course to join as string or int
   * @param {String} joinCode code to use to join a course
   * @returns success message if successful, otherwise throws error
   */
  static async joinCourse(courseId, joinCode) {
    const payload = { join_code: joinCode };
    const res = await axiosInstance.post(`/courses/${courseId}/join`, payload);
    return res.data;
  }

  /**
   * Updates the information of an existing course.
   * @param {Integer|String} courseId ID of course as string or int
   * @param {Object} newValues object mapping key to change with new value
   * @returns newly updated course object
   */
  static async patchCourse(courseId, newValues={}) {
    const res = await axiosInstance.patch(`/courses/${courseId}`, newValues);
    return res.data;
  }

  /**
   * Returns list of user-viewable posts under a given course.
   * @param {Integer|String} courseId ID of course as string or int
   * @returns list of post objects under a given course
   */
  static async getCoursePosts(courseId) {
    if (noBackend) {
      return mockCoursePosts;
    }
    return await genericGet(`/courses/${courseId}/posts`);
  }

  /**
   * Returns data for a given post.
   * @param {Integer|String} courseId ID of course as string or int
   * @param {Integer|String} postId ID of post as string or int
   * @returns post object corresponding to postId
   */
  static async getPost(courseId, postId) {
    if (noBackend) {
      return mockPost;
    }
    return await genericGet(`/courses/${courseId}/posts/${postId}`);
  }

  /**
   * Given a courseId and the contents of a new post, creates a new post.
   * @param {Integer|String} courseId ID of course as string or int
   * @param {Object} newPostData mapping of new post properties with values
   * @returns newly created post object
   */
  static async createPost(courseId, newPostData) {
    const url = `/courses/${courseId}/posts/create`;
    const res = await axiosInstance.post(url, newPostData);
    return res.data;
  }

  /**
   * Updates the information of an existing post.
   * @param {Integer|String} courseId ID of course as string or int
   * @param {Integer|String} postId ID of post as string or int
   * @param {Object} newValues object mapping key to change with new value
   * @returns newly updated post object
   */
  static async patchPost(courseId, postId, newValues={}) {
    const url = `/courses/${courseId}/posts/${postId}`;
    const res = await axiosInstance.patch(url, newValues);
    return res.data;
  }

  /**
   * Updates the information of an existing post.
   * @param {Integer|String} courseId ID of course as string or int
   * @param {Integer|String} postId ID of post as string or int
   * @returns sucess message as string if operation successful
   */
  static async deletePost(courseId, postId) {
    const url = `/courses/${courseId}/posts/${postId}`;
    const res = await axiosInstance(url);
    return res.data;
  }

  /**
   * Returns all tags associated under a given course.
   * @param {Integer|String} courseId ID of course as string or int
   * @returns list of tag objects associated with course
   */
  static async getCourseTags(courseId) {
    if (noBackend) {
      return mockCourseTags;
    }
    return await genericGet(`/course/${courseId}/tags`);
  }

  /**
   * Return data for a given tag.
   * @param {Integer|String} courseId ID of course as string or int
   * @param {Integer|String} tagId ID of tag as string or int
   * @returns tag object associated with tagId
   */
  static async getTag(courseId, tagId) {
    if (noBackend) {
      return mockTag;
    }
    return await genericGet(`/course/${courseId}/tags/${tagId}`);
  }

  /**
   * Given data for a new tag (so just a name e.g. {name: 'example'}), creates
   * new tag object.
   * @param {Integer|String} courseId ID of course as string or int
   * @param {Object} newTagData mapping of new tag properties with values
   * @returns newly created tag object
   */
  static async createTag(courseId, newTagData={}) {
    const url = `/courses/${courseId}/tags/create`;
    const res = await axios.post(url, newTagData)
    return res.data;
  }

  /**
   * Given a string to search, find posts with that contain string(so just a name e.g. {name: 'example'}), creates
   * new tag object.
   * @param {Integer|String} courseId ID of course as string or int
   * @param {String} searchTerm mapping of new tag properties with values
   * @returns results from search
   */
   static async search(courseId, searchTerm) {
    if (noBackend) {
      return mockCoursePosts;
    }
    const url = `/courses/${courseId}/search`;
    const res = await axiosInstance.post(url, {'query' : searchTerm})
    return res.data;
  }
}
