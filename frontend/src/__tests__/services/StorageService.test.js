import StorageService from '../../services/StorageService';

test('StorageService.writeStorageValue works', () => {
  const key = 'test1';
  const value1 = {test1: 'test1'}
  const value2 = {test2: 'test2'}
  let replacedValue = null;

  // set new key and value pair
  replacedValue = StorageService.writeStorageValue(key, value1);
  expect(replacedValue).toBe(null);
  expect(window.localStorage.getItem(key)).toBe(JSON.stringify(value1));

  // set value for existing key 
  replacedValue = StorageService.writeStorageValue(key, value2);
  expect(JSON.stringify(replacedValue)).toBe(JSON.stringify(value1));
  expect(window.localStorage.getItem(key)).toBe(JSON.stringify(value2));
});

test('StorageService.readStorageValue works', () => {
  const key = 'test2';
  const value1 = {test1: 'test1'}
  let replacedValue = null;

  // read value for unset key
  expect(StorageService.readStorageValue(key)).toBe(null);

  // read value for set key
  replacedValue = StorageService.writeStorageValue(key, value1);
  expect(replacedValue).toBe(null);
  expect(JSON.stringify(StorageService.readStorageValue(key))).toBe(
    JSON.stringify(value1)
  );
});
