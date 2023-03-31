import express from "express";
import { createFileIfNotExists } from "./modules/createFileIfNotExists.js";
import { readToFile } from "./modules/readFile.js";
import { writeToFile } from "./modules/writeFile.js";
import { searchQuery } from "./modules/searchQuery.js";
import { getAllOffices } from "./modules/getAllOffices.js";
import { getOfficesList } from "./modules/getOfficesList.js";
import { getSvgElement } from "./modules/getSvgElement.js";

const server = express();
export const _dirname = new URL('.',import.meta.url).pathname
server.use(express.static(`${_dirname}/../client/`));
server.use(express.json());

server.get('/getoffice/:name/:useramount', async (req, res) => {
    const { name,useramount } = req.params
    await createFileIfNotExists(name,useramount)
    let content =  await readToFile(name)
    res.send(content)
})

server.get('/getofficeslist/:checkedboxes',async (req,res)=>{
    const { checkedboxes } = req.params
    const requestedFloors = JSON.parse(checkedboxes)
    const officesList = getOfficesList( requestedFloors, await getAllOffices() ) 
    res.send(officesList)
})

// server.get('/offices123/',async (req,res)=>{
//     const { floor, username } = req.query
//     const offices = await getAllOffices()
//     const filterred = offices.filter(o => !floor || o.floor === floor)
//     res.send(filterred)
// })



server.post('/updateuserinfo/',async (req,res)=>{
    console.log(req.body)
    await writeToFile(req.body)
    res.send()
})


server.get('/search/',async (req,res)=>{
    const {key} = req.query
    console.log(key)
    const result = await searchQuery(key)
    console.log(result)
    res.send(JSON.stringify(result))
})


server.get('/offices',async (req,res)=>{
    const {floor} = req.query
    const offices = await getAllOffices()
    .then( allOffices => allOffices.filter(of=> !floor || floor === of.floor))
    res.send(offices)
})

server.get('/getsvgelement/',async (req,res)=>{
    const {requestedSvg} = req.query
    console.log(requestedSvg)
    const svg = await getSvgElement(requestedSvg)
    res.send(svg)
})

server.get('/getofficeinformation/', async (req, res) => {
    const { office } = req.query
    let content =  await readToFile(office)
    res.send(content)
})


server.listen(3000, console.log("listens to 3000"));
