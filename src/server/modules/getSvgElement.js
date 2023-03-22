import { _dirname } from "../server.mjs";
import fs from 'fs/promises'

export async function getSvgElement(svg){
    let  requestedFile = `${_dirname}/../../svgs/${svg}.txt`
    
    try{    
        const content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
        return content
    }catch(err){
        console.log(err)
    }
}