import fs from 'fs/promises'
import { _dirname } from '../server.js';


export async function getUsersByOfficeNames(offices){
    console.log(offices)
    return await Promise.all(
        offices.map(async office => {
            return JSON.parse( await fs.readFile(`${_dirname}/../../content/offices/${office.name}.json`, 'utf-8') )
        })
    )
}