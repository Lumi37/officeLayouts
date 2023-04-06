process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
import { initIdapUsers } from "./idapUsers.js";
import express from "express";
import { r } from "./router.js";
import fs from 'fs/promises'


const server = express();

export const _dirname = new URL('.',import.meta.url).pathname
server.use(express.static(`${_dirname}/../client/`));
server.use(express.json());
server.use(r)
initIdapUsers(await allStoredUsers())
server.listen(3000, console.log("listens to 3000"));

async function allStoredUsers(){
    const offices = await Promise.all(
            (await fs.readdir(`${_dirname}/../../content/offices/`))
            .map( async office => 
                JSON.parse(await fs.readFile(`${_dirname}/../../content/offices/${office}`,'utf-8')))  
        )
        return offices.flat()
}