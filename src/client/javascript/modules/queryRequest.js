import {searchBar} from '../index.js'
import { constructQueryResultsList } from './constructQueryResultsList.js'
// let lastRequestTime 
// let requestDelay = true
// let requestDelayTime 
// let searchQuery = true


export async function queryRequest(){
    if(searchBar.value){
        
        const response =  await fetch(`/search/${searchBar.value.trim()}`)
        const searchArray = await response.json()
        constructQueryResultsList(searchArray)
    }
}

// export async function queryRequest(){
//     const dateTimeNow = Date.now()
//     if(searchQuery && searchBar.value ){
//         searchQuery = false
//         requestDelay = true 
//         lastRequestTime = Date.now()
//         const response =  await fetch(`/search/${searchBar.value.trim()}`)
//         const searchArray = await response.json()
//         constructQueryResultsList(searchArray)
//     }

//     if(Math.floor((dateTimeNow - lastRequestTime) / 1000)>1){
//         searchQuery = true 
//         lastRequestTime=''
//         requestDelay=''
//     }
    
// }