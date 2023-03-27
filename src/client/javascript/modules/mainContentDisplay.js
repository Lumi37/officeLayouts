import { tooltip } from "./tooltip.js";
import { deleteText } from "./deleteText.js";
import { autofillText } from "./autofillText.js";
import { selectedOffice } from "../index.js";

export const svgContainer = document.querySelector("#svgs");
let selectedUser;
let hoverUser
let selectListedUser

svgContainer.addEventListener("click", (e) => {
  if (e.target.dataset.position) {
    selectedUser = selectUser(e.target, selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target, selectListedUser)
    moveInputCursor()
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

//FUNCTIONS

//temp ?/*
export function moveInputCursor(){
    const input = document.querySelector('#user')
    input.setSelectionRange(0,0)
    input.focus(); 
    input.select()
}
// */
function selectUser(target, selectedUser) {
    if (selectedUser) selectedUser.classList.remove("highlighted");
    selectedUser = target;
    selectedUser.classList.add("highlighted");
    return selectedUser;
  }
  

  function highlightCorrespondingListedUser(target, hoverListedUser){
    let selectedOfficeListedUsers = document.querySelectorAll('.userListItem') 
    if(hoverListedUser)hoverListedUser.classList.remove('highlightUserListItem')
    selectedOfficeListedUsers.forEach(user =>{
        if(user.dataset.position === target.dataset.position){
            hoverListedUser = user 
            hoverListedUser.classList.add('highlightUserListItem')
        }
    })
    return hoverListedUser 
}

function selectCorrespondingListedUser(target,hoverListedUser){
    let selectedOfficeListedUsers = document.querySelectorAll('.userListItem')
    if(hoverListedUser) hoverListedUser.classList.remove('selectUserListItem')
    selectedOfficeListedUsers.forEach(user => {
        if(user.dataset.position === target.dataset.position){
            hoverListedUser = user
            hoverListedUser.classList.add('selectUserListItem')
        }
    })
    return hoverListedUser
}   