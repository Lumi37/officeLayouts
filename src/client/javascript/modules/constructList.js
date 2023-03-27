import {selectedOfficeUsersList} from '../index.js'
export function constructList(){
    let selectedOfficeUsers = document.querySelectorAll('rect[data-user]')
    selectedOfficeUsersList.innerHTML=''
    selectedOfficeUsers.forEach(user=>{
      selectedOfficeUsersList.innerHTML += /*html*/`
        <li data-user="${user.dataset.user}" data-outlet="${user.dataset.outlet}" data-position="${user.dataset.position}" class="userListItem">User:&nbsp; 
          <span>${user.dataset.user}</span>
          &nbsp; Outlet:&nbsp; 
          <span>${user.dataset.outlet}</span>
        </li>`
    })
}