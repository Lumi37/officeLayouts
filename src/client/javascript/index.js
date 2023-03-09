import { highlightOffice } from "./modules/highlightOffice.js";
import { displaySelectedOffice } from "./modules/displaySelectedOffice.js";
import { highlightCorrespondingUser } from "./modules/highlightCorrespondingUser.js";
const svgContainer = document.querySelector("#svgs");
const log = document.querySelector("#log");
const powerOutlet = document.querySelector("#powerOutlet");
export const offices = document.querySelectorAll('svg')
const officesList = document.querySelector('.listedOffices')
let selectedOfficeUsersList = document.querySelector('.listedUsers')
let selectedUser;
let hoverUser
const selectedOffice = document.querySelector('#office')

svgContainer.addEventListener("click", (e) => {
  if (e.target.dataset.user) {
    selectedUser = highlightOffice(e.target, selectedUser);
    log.innerHTML = e.target.dataset.user;
    powerOutlet.value = e.target.dataset.outlet;
  } else {
    selectedUser = highlightOffice(e.target, selectedUser);
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
      selectedOfficeUsersList.innerHTML += `<li data-user="${user.dataset.user}" data-outlet="${user.dataset.outlet}" class="userListItem">User:&nbsp; <span>${user.dataset.user}</span>&nbsp; PO:&nbsp; <span>${user.dataset.outlet}</span></li>`
    })
  })
})


selectedOfficeUsersList.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.user){
    console.log(e.target.dataset.user)
    hoverUser = highlightCorrespondingUser(e.target,hoverUser)
  }
})
