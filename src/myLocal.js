export default function myLocal() {
  const localLength = function () {
    return localStorage.length;
  };

  const isExist = function (storageName) {
    return localStorage.hasOwnProperty(storageName);
  };

  const createStorage = function (storageName) {
    const storageLength = localLength();
    const isStorageExist = isExist(storageName);
    if (storageLength === 0 || !isStorageExist) {
      localStorage.setItem(storageName, JSON.stringify([]));
    } else {
      console.log("storageExist");
    }
  };

  const getStorage = function (storageName) {
    return JSON.parse(localStorage.getItem(storageName));
  };

  const setStorage = function (storageName, item) {
    const myItem = JSON.stringify(item);
    localStorage.setItem(storageName, myItem);
  };

  return { createStorage, getStorage, setStorage, isExist };
}
