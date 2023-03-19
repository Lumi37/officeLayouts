import { queryResultsList } from "../index.js";

export function constructQueryResultsList(resultsArr){
    queryResultsList.innerHTML = ''
    resultsArr.forEach(user => {
        queryResultsList.innerHTML+=`<li
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
