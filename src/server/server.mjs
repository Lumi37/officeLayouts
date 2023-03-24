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
    res.end()
})

server.get('/getofficeslist/:checkedboxes',async (req,res)=>{
    const { checkedboxes } = req.params
    const requestedFloors = JSON.parse(checkedboxes)
    const officesList = getOfficesList( requestedFloors, await getAllOffices() ) 
    res.send(officesList)
    res.end()
})

server.get('/getsvgelement/:requestedSvg',async (req,res)=>{
    const {requestedSvg} = req.params
    const svg = await getSvgElement(requestedSvg)
    res.send(svg)
    res.end()
})


server.get('/search/:key',async (req,res)=>{
    
    const {key} = req.params
    const result = await searchQuery(key)
    res.send(JSON.stringify(result))
    res.end()
})

server.post('/updateuserinfo',async (req,res)=>{
    let updatedContent
    await writeToFile(req.body)
    updatedContent = await readToFile(req.body.office)
    res.send(updatedContent)
    res.end()
})

server.listen(3000, console.log("listens to 3000"));
