import express from "express";
import fs from "fs/promises";
import { readToFile } from "./modules/readFile.js";

const server = express();
export const _dirname = new URL('.',import.meta.url).pathname
server.use(express.static(`${_dirname}/../client/`));
server.use(express.json());

server.post('/getData', async (req,res)=>{
    let content =  await readToFile(req.body.file)
    res.send(content)
    res.end()
})
server.post('/postData',(req,res)=>{
    console.log(req.body.user)
})

server.listen(3000, console.log("listens to 3000"));
