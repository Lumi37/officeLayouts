import { selectUser } from "./modules/selectUser.js";
import { displaySelectedOffice } from "./modules/displaySelectedOffice.js";
import { highlightCorrespondingUser } from "./modules/highlightCorrespondingUser.js";
import { selectUserFromList } from "./modules/selectUserFromList.js";
import { selectCorrespondingListedUser } from "./modules/selectCorrespondingListedUser.js";
import { highlightCorrespondingListedUser } from "./modules/highlightCorrespondingListedUser.js";
import { constructList } from "./modules/constructList.js";
import { updateSelectedOfficeInformation } from "./modules/updateSelectedOfficeInfo.js";
import { tooltip } from "./modules/tooltip.js";
import { tooltipByList } from "./modules/tooltipByList.js";
import { autofillText } from "./modules/autofillText.js";
import { deleteText } from "./modules/deleteText.js";
import { timerForNextRequest } from "./modules/timerForNextRequest.js";

export const svgContainer = document.querySelector("#svgs");
export const userTextInput = document.querySelector('#user')
export const outletTextInput = document.querySelector("#dataOutlet");
export const offices = document.querySelectorAll('svg')
export let selectedOfficeUsersList = document.querySelector('.listedUsers')
export const selectedOffice = document.querySelector('#office')
const searchBar = document.querySelector('#search')
const officesList = document.querySelector('.listedOffices')
const changeButton = document.querySelector('#submitChanges')
let searchQuery = true
let searchKeyWord 
let searchArray 
let selectedUser;
let hoverUser
let selectListedUser

svgContainer.addEventListener("click", (e) => {
  if (e.target.dataset.position) {
    selectedUser = selectUser(e.target, selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target, selectListedUser)
    autofillText(e.target)
  } else {
    selectedUser = selectUser(e.target, selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target, selectListedUser)
    deleteText()
  }
});

svgContainer.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.position){
    hoverUser = highlightCorrespondingListedUser(e.target,hoverUser)
    tooltip(selectedOffice,e.target)
  }
  else{
    hoverUser = highlightCorrespondingListedUser(e.target,hoverUser)
  }
})

svgContainer.addEventListener('mouseout',e=>{
  if(hoverUser)hoverUser.classList.remove('highlightUserListItem')
  const tooltip = document.querySelector('.tooltip');
  if(tooltip) tooltip.remove()
})


offices.forEach(svg=>{
  officesList.innerHTML += `<li data-office ="${svg.dataset.office}">${svg.dataset.office}</li>`
})



document.querySelectorAll('.listedOffices li').forEach(office=>{
  office.addEventListener('click',async e=>{
    selectedOfficeUsersList.innerHTML=''
    selectedOffice.innerHTML = displaySelectedOffice(e.target,selectedOffice)
    const userAmount = document.querySelectorAll(`[data-office='${selectedOffice.innerHTML}'] rect[data-position]`)
    console.log(userAmount)
    const response = await fetch(`/getoffice/${selectedOffice.innerHTML}/${userAmount.length}`)
    const receivedData = await response.json()
    updateSelectedOfficeInformation(receivedData)
    constructList()
  })
})


selectedOfficeUsersList.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.position){
    hoverUser = highlightCorrespondingUser(e.target,hoverUser)
    tooltipByList(hoverUser,e.target)
  }
})

selectedOfficeUsersList.addEventListener('mouseout',e=>{
  if(hoverUser){
    hoverUser.classList.remove('hoverUser')
    const tooltip = document.querySelector('.tooltip');
    if(tooltip) tooltip.remove()
    
  }
})

selectedOfficeUsersList.addEventListener("click", (e) => {
    selectedUser = selectUserFromList(e.target.closest('li[data-user]'), selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target.closest('li[data-user]'), selectListedUser)
    autofillText(e.target.closest('li[data-position]'))
});

changeButton.addEventListener('click',async e=>{
if(outletTextInput.dataset.position){
  const userInfo = {
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify({
      user: userTextInput.value.trim(),
      outlet: outletTextInput.value.trim(),
      office: selectedOffice.innerHTML,
      position: outletTextInput.dataset.position
    }
    )}
  const response  = await fetch('/updateuserinfo',userInfo)
  const receivedData = await response.json()
  updateSelectedOfficeInformation(receivedData)
  constructList()
}
  
})

userTextInput.addEventListener('keypress',  e=>{
  if(e.key ==='Enter'){
    changeButton.click() 
  }
})

outletTextInput.addEventListener('keypress',e=>{
  if(e.key ==='Enter'){
    changeButton.click()
  }
})

// searchBar.addEventListener('keypress', async e=>{
//   console.log(searchQuery && !searchKeyWord && !(e.key==='Enter'))
//   if(searchQuery && !searchKeyWord && !(e.key==='Enter') ){
//     searchKeyWord = e.key
//     searchQuery = false
//     timerForNextRequest()
//     const response =  await fetch(`/search/${e.key}`)
//     searchArray = await response.json()
//     console.log(searchArray)
//   }
// })

document.querySelector('#baton').addEventListener('click',e=>{
  timerForNextRequest()
})