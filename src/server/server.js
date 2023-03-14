import express from "express";
import { createFileIfNotExists } from "./modules/createFileIfNotExists.js";
import { readToFile } from "./modules/readFile.js";
import { writeToFile } from "./modules/writeFile.js";

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



server.post('/updateuserinfo',async (req,res)=>{
    let updatedContent
    await writeToFile(req.body)
    updatedContent = await readToFile(req.body.office)
    res.send(updatedContent)
    res.end()
})

server.listen(3000, console.log("listens to 3000"));
