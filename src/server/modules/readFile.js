import fs from 'fs/promises'
import {_dirname} from '../server.mjs'
export async function readToFile(office){
    let  requestedFile = `${_dirname}/../../content/offices/${office}.json`
    try{    
        const content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
        return content
    }catch(err){
        console.log(err)
    }
}