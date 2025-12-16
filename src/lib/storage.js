import nodePersist from "node-persist";
import os from "os";
import path from "path";

let isInitialized = false;

const initStorage = async () => {
  if (!isInitialized) {
    const homeDirectory = os.homedir();
    const storageDirectory = path.join(homeDirectory, ".config", "pmc");

    await nodePersist.init({
      dir: storageDirectory,
      logging: false,
      ttl: false,
    });
    isInitialized = true;
  }
};

export const setItem = async (key, value) => {
  await initStorage();
  return nodePersist.setItem(key, value);
};

export const getItem = async (key) => {
  await initStorage();
  return nodePersist.getItem(key);
};

export const clear = async () => {
  await initStorage();
  return nodePersist.clear();
};

export const getHostIP = async () => {
  await initStorage();
  return nodePersist.getItem("host");
};