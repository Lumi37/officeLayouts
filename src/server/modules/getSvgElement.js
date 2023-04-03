import { _dirname } from "../server.js";
import fs from 'fs/promises'

export async function getSvgElement(svg){
<<<<<<< HEAD
    let  requestedFile = `${_dirname}/../../svgs/${svg}.svg`
=======
    let  requestedFile = `${_dirname}/../../content/svgs/${svg}.svg`
>>>>>>> test
    
    try{    
        const content = await fs.readFile(requestedFile,{encoding: 'utf-8'})
        return content
    }catch(err){
        console.log(err)
    }
}