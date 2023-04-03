import express from "express";
import { readToFile } from "./modules/readFile.js";
import { writeToFile } from "./modules/writeFile.js";
import { searchQuery } from "./modules/searchQuery.js";
import { getAllOffices } from "./modules/getAllOffices.js";
import { getSvgElement } from "./modules/getSvgElement.js";

const server = express();
export const _dirname = new URL('.',import.meta.url).pathname
server.use(express.static(`${_dirname}/../client/`));
server.use(express.json());

server.post('/updateuserinfo/',async (req,res)=>{
    await writeToFile(req.body)
    res.send()
})


server.get('/search/',async (req,res)=>{
    const {key} = req.query
    const result = await searchQuery(key)
    res.send(JSON.stringify(result))
})


server.get('/offices',async (req,res)=>{
    const {floor} = req.query
    const offices = await getAllOffices()
    .then( allOffices => allOffices.filter(of=> floor==='all-offices' || floor.includes(of.floor)))
    res.send(offices)
})

server.get('/getsvgelement/',async (req,res)=>{
    const {requestedSvg} = req.query
    const svg = await getSvgElement(requestedSvg)
    res.send(svg)
})

server.get('/getofficeinformation/', async (req, res) => {
    const { office } = req.query
    let content =  await readToFile(office)
    res.send(content)
})

server.get('/download/', async (req, res)=>{
    const {office} = req.query
    const content = await readToFile(office)
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
    console.log(res)
    res.send(content)
})


server.get('/download-csv', async (req, res) => {
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

server.listen(3000, console.log("listens to 3000"));
