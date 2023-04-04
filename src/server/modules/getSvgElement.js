import { _dirname } from "../server.js";
import fs from 'fs/promises'

export async function getSvgElement(svg){
    let  requestedFile = `${_dirname}/../../content/svgs/${svg}.svg`    
    const content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
    return content

}