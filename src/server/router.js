import {Router} from "express";
import {appendInfoFromIdap} from './idapUsers.js'
import fs from 'fs/promises'
import {_dirname} from './server.js'
export const r = Router()


r.post('/updateuserinfo/',async (req,res)=>{
  await writeToFile(req.body)
  res.send()
})


r.get('/search/',async (req,res)=>{
  const {key} = req.query
  const result = await searchQuery(key)
  res.send(result)
})


r.get('/offices',async (req,res)=>{
  const {floor} = req.query
  const offices = await getAllOffices()
  .then( allOffices => allOffices.filter(of=> floor==='all-offices' || floor.includes(of.floor)))
  res.send(offices)
})

r.get('/getsvgelement/',async (req,res)=>{
  const {requestedSvg} = req.query
  const svg = await getSvgElement(requestedSvg)
  res.send(svg)
})

r.get('/getofficeinformation/', async (req, res) => {
  const { office } = req.query
  let content =  await readToFile(office)
    .then(async officeUsers =>await appendInfoFromIdap(officeUsers))
  res.send(content)
})

r.get('/download-selected-office-list/', async (req, res) => {
  const {floor} = req.query
  const offices = await getAllOffices()
    .then( allOffices => allOffices.filter(of=> floor==='all-offices' || floor.includes(of.floor)))
  const users =  await getUsersByOfficeNames(offices)
    .then(async userdata=> await appendInfoFromIdap(userdata))
    .then(strObj=>JSON.parse(strObj))
  let data = []
  data.push(['User','Display Name','Outlet','Office'])
  users.flat().forEach(user => {
      data.push([user.user, user.displayName, user.outlet, user.office])
  });
  const csv = data.map(row => row.join(',')).join('\n');
  res.set('Content-Disposition', 'attachment; filename=data.csv');
  res.set('Content-Type', 'text/csv');
  res.send(csv);
});


r.get('/download-selected-office/', async (req, res) => {
  const {office} = req.query
  const users = await readToFile(office).then(async userdata=> await appendInfoFromIdap(userdata))
  .then(strObj=>JSON.parse(strObj))
  let data = []
  data.push(['User','Display Name','Outlet'])
  users.forEach(user => {
      data.push([user.user,user.displayName, user.outlet])
  });
  const csv = data.map(row => row.join(';')).join('\n');
  res.set('Content-Disposition', 'attachment; filename=data.csv');
  res.set('Content-Type', 'text/csv');
  res.send(csv);
});




// FUNCTIONS 

async function  getAllOffices(){
  const directoryPath = `${_dirname}/../../content/offices/`
  const files = await fs.readdir(directoryPath)
  const fileNames = files.map(file=>file.replace('.json',''))
  const offices = fileNames.map(f => {
      let floor
      if( f[0] === 'B')floor = 'b-floor'
      else if(f[0] === 'A')floor = 'a-floor'
      else floor = 'ground-floor'
      return {
          name: f,
          floor: floor
      }
  })
  return offices
}



async function writeToFile(body) {
  let requestedFile = `${_dirname}../../content/offices/${body.office}.json`;
  let requestedFileContent;

  requestedFileContent = JSON.parse(
    await fs.readFile(requestedFile, { encoding: "utf-8" })
  );

  for (let i = 0; i < requestedFileContent.length; i++) {
    if (requestedFileContent[i].position === body.position) {
      requestedFileContent[i].user = body.user;
      requestedFileContent[i].outlet = body.outlet;
    }
  }

  await fs.writeFile(
    requestedFile,
    JSON.stringify(requestedFileContent, null, 2)
  );
}



async function getSvgElement(svg){
    let  requestedFile = `${_dirname}/../../content/svgs/${svg}.svg`    
    const content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
    return content

}



async function getUsersByOfficeNames(offices){
    return await Promise.all(
        offices.map(async office => {
            return JSON.parse( await fs.readFile(`${_dirname}/../../content/offices/${office.name}.json`, 'utf-8') )
        })
    )
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
    const appenededArr = await appendInfoFromIdap([...arr.flat()])
    const flattenedArr = [...arr.flat()];
    filteredArr = flattenedArr.filter(
      (user) =>
        user.user.toLowerCase().includes(str.toLowerCase()) ||
        user.outlet.toLowerCase().includes(str.toLowerCase()) ||
        user.displayName.toLowerCase().includes(str.toLowerCase()) ||
        user.cn.toLowerCase().includes(str.toLowerCase()) 

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



async function readToFile(office){
    let  requestedFile = `${_dirname}/../../content/offices/${office}.json`
    const content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
    return content
}