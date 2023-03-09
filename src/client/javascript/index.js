import { selectUser } from "./modules/selectUser.js";
import { displaySelectedOffice } from "./modules/displaySelectedOffice.js";
import { highlightCorrespondingUser } from "./modules/highlightCorrespondingUser.js";
import { selectUserFromList } from "./modules/selectUserFromList.js";
import { highlightCorrespondingListedUser } from "./modules/highlightCorrespondingListedUser.js";

const svgContainer = document.querySelector("#svgs");
const log = document.querySelector("#log");
const powerOutlet = document.querySelector("#powerOutlet");
export const offices = document.querySelectorAll('svg')
const officesList = document.querySelector('.listedOffices')
let selectedOfficeUsersList = document.querySelector('.listedUsers')
let selectedUser;
let hoverUser
let hoverListedUser
const selectedOffice = document.querySelector('#office')

svgContainer.addEventListener("click", (e) => {
  if (e.target.dataset.user) {
    selectedUser = selectUser(e.target, selectedUser);
    hoverListedUser = highlightCorrespondingListedUser(e.target, hoverListedUser)
    log.innerHTML = e.target.dataset.user;
    powerOutlet.value = e.target.dataset.outlet;
  } else {
    selectedUser = selectUser(e.target, selectedUser);
    //hoverListedUser = highlightCorrespondingListedUser(e.target, hoverListedUser)
    log.innerHTML=''
    powerOutlet.value=''
  }
});


offices.forEach(svg=>{
  officesList.innerHTML += `<li>${svg.dataset.office}</li>`
})



document.querySelectorAll('.listedOffices li').forEach(office=>{
  office.addEventListener('click',e=>{
    selectedOfficeUsersList.innerHTML=''
    selectedOffice.innerHTML = displaySelectedOffice(e.target,selectedOffice)
    let selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-user]')
    selectedOfficeUsers.forEach(user=>{
      // selectedOfficeUsersList.innerHTML += `
      // <li data-user="${user.dataset.user}" data-outlet="${user.dataset.outlet}" class="userListItem">
      //   <div>User:</div>
      //   <span>${user.dataset.user}</span>
      //   <div>PO:</div> 
      //   <span>${user.dataset.outlet}</span>
      // </li>`
      selectedOfficeUsersList.innerHTML += `<li data-user="${user.dataset.user}" data-outlet="${user.dataset.outlet}" class="userListItem">User:&nbsp; <span>${user.dataset.user}</span>&nbsp; PO:&nbsp; <span>${user.dataset.outlet}</span></li>`
    })
  })
})


selectedOfficeUsersList.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.user){
    hoverUser = highlightCorrespondingUser(e.target,hoverUser)
  }
})

selectedOfficeUsersList.addEventListener('mouseleave',e=>{
  hoverUser.classList.remove('hoverUser')
})

selectedOfficeUsersList.addEventListener("click", (e) => {
    selectedUser = selectUserFromList(e.target.closest('li[data-user]'), selectedUser);
    log.innerHTML = e.target.closest('li[data-user]').dataset.user;
    powerOutlet.value = e.target.closest('li[data-user]').dataset.outlet;
});