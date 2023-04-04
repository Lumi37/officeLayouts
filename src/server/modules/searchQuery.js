import fs from "fs/promises";

import { _dirname } from "../server.js";

export async function searchQuery(str) {
  let result;
  const directoryPath = `${_dirname}/../../content/offices/`;
  const searchPromise = new Promise(async (resolve, reject) => {
    let filteredArr = [];
    const files = await fs.readdir(directoryPath);
    const promises = files.map(async (file) => {
      const fileContent = JSON.parse(
        await fs.readFile(`${directoryPath + file}`)
      );
      return fileContent;
    });
    const arr = await Promise.all(promises);
    const flattenedArr = [...arr.flat()];
    filteredArr = flattenedArr.filter(
      (user) =>
        user.user.toLowerCase().includes(str.toLowerCase()) ||
        user.outlet.toLowerCase().includes(str.toLowerCase())
    );
    resolve(filteredArr);
  });

  result = searchPromise.then(
    (arr) => {
      return arr;
    },
    (error) => {
      return error;
    }
  );
  return result;
}
