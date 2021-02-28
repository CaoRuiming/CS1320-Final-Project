/**
 * Class that bundles static utility functions for interacting with browser
 * `localStorage`.
 */
export default class StorageService {
	/**
	 * Returns the current value associated with the given key, or null if the
	 * given key does not exist in the list associated with the object.
	 * @param {String} key for item in localStorage
	 * @returns {*} value associated with key or null if no such key exists
	 */
	static readStorageValue(key) {
		const value = window.localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	}

	/**
	 * Sets the value of the pair identified by key to value, creating a new
	 * key/value pair if none existed for key previously.
	 * Throws a "QuotaExceededError" DOMException exception if the new value
	 * couldn't be set. (Setting could fail if, e.g., the user has disabled
	 * storage for the site, or if the quota has been exceeded.)
	 * @param {String} key for item to write in localStorage
	 * @param {*} value a JSON-compatible value to be stored under `key`
	 * @returns {*} old value associated with key or null if no such key existed
	 */
	static writeStorageValue(key, value) {
		const oldValue = this.readStorageValue(key);
		window.localStorage.setItem(key, JSON.stringify(value));
		return oldValue;
	}

	/**
	 * Removes the key/value pair with the given key from the list associated
	 * with the object, if a key/value pair with the given key exists.
	 * @param {String} key for item to delete from localStorage
	 * @returns {*} old value associated with key or null if no such key existed
	 */
	static removeStorageValue(key) {
		const oldValue = this.readStorageValue(key);
		window.localStorage.removeItem(key);
		return oldValue;
	}

	/**
	 * Empties the list associated with the object of all key/value pairs, if
	 * there are any.
	 */
	static clearStorage() {
		window.localStorage.clear();
	}
};
