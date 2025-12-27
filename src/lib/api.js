import { addItem, clear, getPasswords } from "./storage.js";

export const getAllPasswords = async () => await getPasswords();

export const getPasswordByUrl = async (url) =>
  await getPasswords().then((passwords) =>
    passwords.filter((password) => password.url === url)
  );

export const createPassword = async (url, username, password) => {
  const passwordMapping = {
    url: url,
    username: username,
    password: password,
  };
  await addItem(passwordMapping);
};

export const deletePasswordByIndex = async (index) => {
  await clear(index);
};
