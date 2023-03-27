import {searchBar,queryResultsList} from '../index.js'
import { constructQueryResultsList } from './constructQueryResultsList.js'

export async function queryRequest(){
    if(searchBar.value.length > 2){
        const response =  await fetch(`/search/${searchBar.value.trim()}`)
        const searchArray = await response.json()
        if(searchArray)
        constructQueryResultsList(searchArray)
    }else{
        queryResultsList.innerHTML=''
    }
}

