import { _dirname } from "./server.js";
import fs from 'fs/promises'
let storedUsers;

export async function initIdapUsers(users) {
    // const allUsers = await fetch("http://api.lan.eoppep.gr/ldap/users").then(async (r) => await r.json());
    const allUsers = await fs.readFile(`${_dirname}/../../content/notes/info.json`).then((r) => r.toString('utf-8')).then((r) => JSON.parse(r));
    storedUsers =[
        ...allUsers
            .map((user) => {
                let toBeStored = [];
                for (let i = 0; i < users.length; i++) {
                    if (user.sAMAccountName === users[i].user) toBeStored.push(user);
                }
                return toBeStored;
            })
            .filter((user) => {
                if (user.length >= 1) {
                    return user;
                }
            })
            .flat()
    ];
}

export async function appendInfoFromIdap(officeUsers){
    if(typeof(officeUsers) === 'string')
        officeUsers = JSON.parse(officeUsers)
        officeUsers = officeUsers.flat()
    officeUsers.forEach(u => {
        for(let i=0; i<storedUsers.length; i++){
            if(u.user === storedUsers[i].sAMAccountName){
                u.displayName = storedUsers[i].displayName
                u.cn = storedUsers[i].cn
            }           
        }
    });
    officeUsers.forEach(u=>{
        if(!u.displayName){
            u.displayName = u.user
            u.cn = u.user
        }
    })
    return JSON.stringify(officeUsers)
}


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
    ).then(res=>appendInfoFromIdap(res))
    return result;
  }
  