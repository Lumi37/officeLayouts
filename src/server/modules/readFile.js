import fs from 'fs/promises'
import {_dirname} from '../server.js'
export async function readToFile(office){
    let content
    let  requestedFile = `${_dirname}/../../offices/${office}.json`
    try{    
        content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
        return content
    }catch(err){
        console.log(err)
    }
}