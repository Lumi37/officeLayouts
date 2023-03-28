import fs from 'fs/promises'
import { _dirname } from '../server.mjs'

export async function  getAllOffices(){
    const directoryPath = `${_dirname}/../../content/offices/`
    try{
        const files = await fs.readdir(directoryPath)
        const fileNames = files.map(file=>file.replace('.json',''))
        return fileNames
    }catch(e){
    }
}