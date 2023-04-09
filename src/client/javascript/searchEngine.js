/** @type {HTMLElement}*/
let host

export function initSearchEngine(hostElement){
    host = hostElement
    const searchBar = host.querySelector('#searchbar')
    searchBar.addEventListener('keyup', e=>{
        if(searchBar.value.length > 2 ){
            queryRequest(searchBar)
            const initiatedSearch = new CustomEvent('initiated-search',{bubbles:true})
            host.dispatchEvent(initiatedSearch)
        }else if(searchBar.value.length === 0){
            const canceledSearch = new CustomEvent('canceled-search',{bubbles:true})
            host.dispatchEvent(canceledSearch)
        }
    })

    document.addEventListener('user-selection-by-search',()=>{
        searchBar.value = ''
    })
}


async function queryRequest(searchBar){
        const searchArray =  await fetch(`/search/?key=${searchBar.value.trim()}`).then(res=>res.json())
        if(searchArray){
        const resolvedSearch = new CustomEvent('resolved-search',{detail:searchArray,bubbles:true})
        host.dispatchEvent(resolvedSearch)
        }
}
