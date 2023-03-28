import { refreshSelectedOfficeInfo } from "./mainContentDisplay.js"
import { constructList, selectedOfficeUsersList } from "./userList.js"
import { autofillText, resizeSvg} from "./utilities.js"

export const queryResultsList = document.querySelector('.queryResultsList')
export const searchBar = document.querySelector('#search')

searchBar.addEventListener('keyup',e=>{
    if(searchBar.value)selectedOfficeUsersList.innerHTML = ''
    else if(document.querySelector('svg')){
      constructList()
      queryResultsList.innerHTML=''
    }
    setTimeout(queryRequest,300)
  })
  

  queryResultsList.addEventListener('click',async e=>{
    selectedOfficeUsersList.innerHTML=''
    const target = e.target.closest('li[data-office]')
    selectedOffice.innerHTML = displaySelectedOffice(target,selectedOffice)
    const userAmount = document.querySelectorAll(`[data-office='${selectedOffice.innerHTML}'] rect[data-position]`)
    const response = await fetch(`/getoffice/${selectedOffice.innerHTML}/${userAmount.length}`)
    const receivedData = await response.json()
    refreshSelectedOfficeInfo(receivedData)
    constructList(target)
    autofillText(target)
    selectClickedUserFromSearch()
    resizeSvg()
    queryResultsList.innerHTML=''
    searchBar.value=''
  })
  

async function queryRequest(){
    if(searchBar.value.length > 2){
        const response =  await fetch(`/search/${searchBar.value.trim()}`)
        const searchArray = await response.json()
        console.log(searchArray)
        if(searchArray){
          constructQueryResultsList(searchArray)
        }
    }else{
        queryResultsList.innerHTML=''
    }
}


function constructQueryResultsList(resultsArr){
    queryResultsList.innerHTML = ''
    resultsArr.forEach(user => {
        queryResultsList.innerHTML+=/*html*/`
        <li
          data-office="${user.office}" 
          data-user="${user.user}" 
          data-outlet="${user.outlet}" 
          data-position="${user.position}" class="userListItem">User:&nbsp; 
          <span>${user.user}</span>
          &nbsp; Outlet:&nbsp; 
          <span>${user.outlet}</span>
      </li>`
    });
}