import { selectUser } from "./modules/selectUser.js";
import { displaySelectedOffice } from "./modules/displaySelectedOffice.js";
import { highlightCorrespondingUser } from "./modules/highlightCorrespondingUser.js";
import { selectUserFromList } from "./modules/selectUserFromList.js";
import { selectCorrespondingListedUser } from "./modules/selectCorrespondingListedUser.js";
import { highlightCorrespondingListedUser } from "./modules/highlightCorrespondingListedUser.js";
import { constructList } from "./modules/constructList.js";
// const terror = await fetch('/data')
// const text =  await terror.text()
// console.log(text)
const svgContainer = document.querySelector("#svgs");
// const log = document.querySelector("#log");
const userTextInput = document.querySelector('#user')
const powerOutletTextInput = document.querySelector("#powerOutlet");
export const offices = document.querySelectorAll('svg')
const officesList = document.querySelector('.listedOffices')
export let selectedOfficeUsersList = document.querySelector('.listedUsers')
const changeButton = document.querySelector('#submitChanges')
let selectedUser;
let hoverUser
let selectListedUser
const selectedOffice = document.querySelector('#office')

svgContainer.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    selectedUser = selectUser(e.target, selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target, selectListedUser)
    userTextInput.value = e.target.dataset.user;
    powerOutletTextInput.value = e.target.dataset.outlet;
  } else {
    selectedUser = selectUser(e.target, selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target, selectListedUser)
    userTextInput.value = ''
    powerOutletTextInput.value=''
  }
});

svgContainer.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.user){
    hoverUser = highlightCorrespondingListedUser(e.target,hoverUser)
  }
  else{
    hoverUser = highlightCorrespondingListedUser(e.target,hoverUser)
  }
})

svgContainer.addEventListener('mouseleave',e=>{
  if(hoverUser)hoverUser.classList.remove('highlightUserListItem')
})


offices.forEach(svg=>{
  officesList.innerHTML += `<li data-office ="${svg.dataset.office}">${svg.dataset.office}</li>`
})



document.querySelectorAll('.listedOffices li').forEach(office=>{
  office.addEventListener('click',async e=>{
    selectedOfficeUsersList.innerHTML=''
    selectedOffice.innerHTML = displaySelectedOffice(e.target,selectedOffice)
    const officeReq = {
      method:'POST',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({
        file: selectedOffice.innerHTML}
    )}
    const response = await fetch('/getData',officeReq)
    const receivedData = await response.json()
    console.log(receivedData)
    constructList()
  })
})


selectedOfficeUsersList.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.id){
    hoverUser = highlightCorrespondingUser(e.target,hoverUser)
  }
})

selectedOfficeUsersList.addEventListener('mouseleave',e=>{
  if(hoverUser)hoverUser.classList.remove('hoverUser')
})

selectedOfficeUsersList.addEventListener("click", (e) => {
    selectedUser = selectUserFromList(e.target.closest('li[data-user]'), selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target.closest('li[data-user]'), selectListedUser)
    userTextInput.value = e.target.closest('li[data-user]').dataset.user;
    powerOutletTextInput.value = e.target.closest('li[data-user]').dataset.outlet;
});

changeButton.addEventListener('click',async e=>{
  if(userTextInput.value && powerOutletTextInput.value){
      const userInfo = {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
          user:userTextInput.value,
          powerOutlet:powerOutletTextInput.value}
      )}
      fetch('/dataUpdate',userInfo)
  }

})