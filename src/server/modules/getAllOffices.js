import fs from 'fs/promises'
import { _dirname } from '../server.mjs'

export async function  getAllOffices(){
    const directoryPath = `${_dirname}/../../content/offices/`
    try{
        const files = await fs.readdir(directoryPath)
        const fileNames = files.map(file=>file.replace('.json',''))
        const offices = fileNames.map(f => {
            const floor = f[0] === 'I' ? 'Isogeio' : 'Deuteros Orofos'
            return {
                name: f,
                floor
            }
        })
        return offices
        return fileNames
    }catch(e){
    }
}