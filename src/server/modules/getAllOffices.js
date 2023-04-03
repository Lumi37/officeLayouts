import fs from 'fs/promises'
import { _dirname } from '../server.js'

export async function  getAllOffices(){
    const directoryPath = `${_dirname}/../../content/offices/`
    
    const files = await fs.readdir(directoryPath)
    const fileNames = files.map(file=>file.replace('.json',''))
    const offices = fileNames.map(f => {
        let floor
        if( f[0] === 'B')floor = 'b-floor'
        else if(f[0] === 'A')floor = 'a-floor'
        else floor = 'ground-floor'
        return {
            name: f,
            floor: floor
        }
    })
    return offices
}