import {Router} from "express";
import { readToFile } from "./modules/readFile.js";
import { writeToFile } from "./modules/writeFile.js";
import { searchQuery } from "./modules/searchQuery.js";
import { getAllOffices } from "./modules/getAllOffices.js";
import { getSvgElement } from "./modules/getSvgElement.js";
import { getUsersByOfficeNames } from "./modules/getUsersByOfficeNames.js";
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
  res.send(content)
})

r.get('/download-selected-office-list/', async (req, res) => {
  const {floor} = req.query
  const offices = await getAllOffices()
  .then( allOffices => allOffices.filter(of=> floor==='all-offices' || floor.includes(of.floor)))
  const content = await getUsersByOfficeNames(offices)
  let data = []
  data.push(['User','Outlet','Office'])
  content.flat().forEach(user => {
      data.push([user.user,user.outlet,user.office])
  });
  const csv = data.map(row => row.join(',')).join('\n');
  res.set('Content-Disposition', 'attachment; filename=data.csv');
  res.set('Content-Type', 'text/csv');
  res.send(csv);
});


r.get('/download-selected-office/', async (req, res) => {
  const {office} = req.query
  const content = JSON.parse(await readToFile(office))
  let data = []
  data.push(['User','Outlet'])
  content.forEach(user => {
      data.push([user.user,user.outlet])
  });
  const csv = data.map(row => row.join(',')).join('\n');
  res.set('Content-Disposition', 'attachment; filename=data.csv');
  res.set('Content-Type', 'text/csv');
  res.send(csv);
});

