import { _dirname } from "../server.js";
import fs from 'fs/promises'

export async function getSvgElement(svg){
    let  requestedFile = `${_dirname}/../../content/svgs/${svg}.svg`
    
    try{    
        const content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
        return content
    }catch(err){
        console.log(err)
    }
}