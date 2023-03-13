import express from "express";
import fs from "fs/promises";
import { readToFile } from "./modules/readFile.js";
import { writeToFile } from "./modules/writeFile.js";

const server = express();
export const _dirname = new URL('.',import.meta.url).pathname
server.use(express.static(`${_dirname}/../client/`));
server.use(express.json());

server.get('/getOffice/:name', async (req, res) => {
    const { name } = req.params
    let content =  await readToFile(name)
    res.send(content)
})

server.get('/getOffice1', async (req, res) => {
    const o={a:1,b:2}
    const { a } = o
    const officeName = req.query
    res.send(req.query)
})


server.post('/getData', async (req,res)=>{
    let content =  await readToFile(req.body.office)
    res.send(content)
    res.end()
})
server.post('/postData',async (req,res)=>{
    let updatedContent
    await writeToFile(req.body)
    updatedContent = await readToFile(req.body.office)
    console.log(updatedContent)
    res.send(updatedContent)
    res.end()
})

server.listen(3000, console.log("listens to 3000"));
