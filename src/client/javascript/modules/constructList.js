import {selectedOfficeUsersList} from '../index.js'
export function constructList(){
    let selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-user]')
    selectedOfficeUsers.forEach(user=>{
      selectedOfficeUsersList.innerHTML += `
      <li data-user="${user.dataset.user}" data-outlet="${user.dataset.outlet}" data-id="${user.dataset.id}" class="userListItem">User:&nbsp; <span>${user.dataset.user}</span>&nbsp; PO:&nbsp; <span>${user.dataset.outlet}</span></li>`
    })
}