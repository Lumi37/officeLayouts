import fileSystem from 'fs/promises'
import fs from 'fs'
import { _dirname } from '../server.js'

export async function createFileIfNotExists(office,userAmount){
    let fileLocation = `${_dirname}/../../content/offices/${office}.json`
    if(!fs.existsSync(fileLocation)){
        let fileContent = []
        
        for (let i=0; i<userAmount; i++)
            fileContent.push({user:'',outlet:'',office:office,position:String(i+1)})
        try {
            await fileSystem.writeFile(fileLocation,JSON.stringify(fileContent, null, 2))
            console.log(`file: ${fileLocation} Created Succesfuly`)
        } catch (error) {
            console.error('createFileIfNotExists(office,userAmount)',error)
        }
    }else{
        console.error(`Reading ${office}`)
    }
}