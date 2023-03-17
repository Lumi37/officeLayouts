import fs from 'fs/promises'
import { _dirname } from '../server.mjs'

export async function writeToFile(body){
    let  requestedFile = `${_dirname}../../offices/${body.office}.json`
    let requestedFileContent
    try{
        requestedFileContent = JSON.parse(await fs.readFile(requestedFile,{encoding: 'utf-8'}))
        console.log('filecontent',requestedFileContent)
    }catch(err){
        console.log('readingfile',err)
    }
    for(let i = 0; i<requestedFileContent.length; i++){
        if(requestedFileContent[i].position === body.position){
            requestedFileContent[i].user = body.user
            requestedFileContent[i].outlet = body.outlet
        }
    }
    try{
        await fs.writeFile(requestedFile, JSON.stringify(requestedFileContent, null, 2))
    }catch(err){
        console.log('writetofile'+err)
    }
}