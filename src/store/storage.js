import localforage from "localforage";

const db = localforage.createInstance({
  name: "persist-forage",
});

const indexedDbStorage = {
  db,
  getItem: db.getItem,
  setItem: db.setItem,
  removeItem: db.removeItem,
};

export default indexedDbStorage;
