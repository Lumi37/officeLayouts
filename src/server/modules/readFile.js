import fs from 'fs/promises'
import {_dirname} from '../server.js'
export async function readToFile(requestedFile){
    let content
    try{
        content = await fs.readFile(`${_dirname}/../../offices/${requestedFile}.json`,{encoding: 'utf-8'})
        return content
    }catch(err){
        console.log(err)
    }
}