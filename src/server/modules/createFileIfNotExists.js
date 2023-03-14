import fs, { writeFile } from 'fs'
import fileSystem from 'fs/promises'
import { _dirname } from '../server.js'

export async function createFileIfNotExists(office,userAmount){
    let fileLocation = `${_dirname}/../../offices/${office}.json`
    if(!fs.existsSync(fileLocation)){
        let fileContent = []
        let fileLog 
        
        for (let i=0; i<userAmount; i++)
            fileContent.push({user:'',outlet:'',office:office,position:String(i+1)})
        try {
            fileLog = JSON.parse(await fileSystem.readFile(`${_dirname}/../../offices/fileLog.json`,{encoding: 'utf-8'}))
            fileLog.push({office:office})
            await fileSystem.writeFile(`${_dirname}/../../offices/fileLog.json`,JSON.stringify(fileLog, null, 2))
            await fileSystem.writeFile(fileLocation,JSON.stringify(fileContent, null, 2))
            console.log(`file: ${fileLocation} Created Succesfuly`)
        } catch (error) {
            console.error('createFileIfNotExists(office,userAmount)',error)
        }
    }else{
        console.error('file already exists')
    }
}