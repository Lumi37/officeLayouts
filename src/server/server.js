import express from "express";
import fs from "fs/promises";
import { readToFile } from "./modules/readFile.js";
import { writeToFile } from "./modules/writeFile.js";

const server = express();
export const _dirname = new URL('.',import.meta.url).pathname
server.use(express.static(`${_dirname}/../client/`));
server.use(express.json());

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
