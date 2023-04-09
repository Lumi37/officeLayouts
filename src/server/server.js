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
console.log('1')
initIdapUsers(await allStoredUsers())
server.listen(3000, console.log("listens to 3000"));

export async function allStoredUsers(){
        console.log('2')
        const offices = await Promise.all(
            (await fs.readdir(`${_dirname}/../../content/offices/`))
            .map( async office => 
                JSON.parse(await fs.readFile(`${_dirname}/../../content/offices/${office}`,'utf-8')))  
        )
        console.log('3')

        return offices.flat()
}