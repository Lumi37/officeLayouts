import fs from 'fs/promises'
import _ from 'lodash'
import { _dirname } from '../server.js';

export async function searchQuery(key){
    let result
    const directoryPath = `${_dirname}/../../offices/`;
    const searchPromise = new Promise(async (resolve, reject) => {
      try {
        let filteredArr = []
        const files = await fs.readdir(directoryPath);
        const promises = files.map(async (file) => {
          try {
            const fileContent = JSON.parse(
              await fs.readFile(`${directoryPath + file}`)
            );
            return fileContent;
          } catch (e) {
            console.error(e);
            throw new Error('something went wrong reading file ' + file);
          }
        });
        const arr = _.flatten(await Promise.all(promises));
        filteredArr = arr.filter(user=>( (user.user.toLowerCase().startsWith(key.toLowerCase())) || (user.outlet.toLowerCase().startsWith(key.toLowerCase())) ))
        resolve(filteredArr);
      } catch (error) {
        console.log(error);
        reject('something went wrong!');
      }
    });
   
    result = searchPromise.then(
        (arr)=>{return arr},
        (error)=>{return error}
    )
    return result
}