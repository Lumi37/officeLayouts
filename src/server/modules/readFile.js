import fs from 'fs/promises'
import {_dirname} from '../server.js'
export async function readToFile(office){
    let  requestedFile = `${_dirname}/../../content/offices/${office}.json`
    const content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
    return content
}