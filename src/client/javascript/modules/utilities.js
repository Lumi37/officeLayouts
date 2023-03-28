import {outletTextInput,userTextInput} from './editUser.js'
import { svgContainer } from './mainContentDisplay.js';
import { selectedOfficeUsersList } from "./userList.js"
import {selectedOffice} from "./editUser.js"


let selectedUser;
let hoverUser
let selectListedUser


window.addEventListener('resize',()=>{
  if(document.querySelector('svg')){
    const svg = document.querySelector('svg')
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    if(windowHeight>801)
      svg.style.height = '800px'
    else
      svg.style.height = String(windowHeight - 167)+'px'
    if(windowWidth>1201)
      svg.style.width = '1200px'
    else
      svg.style.width = String(windowWidth - 274)+'px'
  }
})
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

selectedOfficeUsersList.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.position){
    hoverUser = highlightCorrespondingUser(e.target,hoverUser)
    // tooltipFromList(hoverUser,e.target)
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
    moveInputCursor()
});


export function moveInputCursor(){
    const input = document.querySelector('#user')
    input.setSelectionRange(0,0)
    input.focus(); 
    input.select()
}

export function selectUser(target, selectedUser) {
  if (selectedUser) selectedUser.classList.remove("highlighted");
  selectedUser = target;
  selectedUser.classList.add("highlighted");
  return selectedUser;
}


export function autofillText(target){
    outletTextInput.value = target.dataset.outlet
    outletTextInput.dataset.position = target.dataset.position
    userTextInput.value = target.dataset.user
}

export function deleteText(){
    outletTextInput.value = ''
    outletTextInput.dataset.position = ''
    userTextInput.value = ''
}

export function tooltip(selectedOffice,target){
  if(selectedOffice && target.dataset.position ){
      const tooltip = document.createElement('div')
      tooltip.innerHTML = /*html*/`User:<span>${target.dataset.user}</span>&nbsp;PO:<span>${target.dataset.outlet}</span>`
      tooltip.classList.add('tooltip')
      document.body.appendChild(tooltip)
      const rectBounds = target.getBoundingClientRect()
      tooltip.style.top = rectBounds.top - 45 + 'px'
      tooltip.style.left = rectBounds.right -125 + 'px'
  }
}

export function tooltipFromList(hoverUser){
  if(hoverUser){
      const tooltip = document.createElement('div')
      tooltip.innerHTML = /*html*/`User:<span>${hoverUser.dataset.user}</span>&nbsp;PO:<span>${hoverUser.dataset.outlet}</span>`
      tooltip.classList.add('tooltip')
      document.body.appendChild(tooltip)
      const rectBounds = hoverUser.getBoundingClientRect()
      tooltip.style.top = rectBounds.top - 45 + 'px'
      tooltip.style.left = rectBounds.right -125 + 'px'
  }
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

export function selectCorrespondingListedUser(target,hoverListedUser){
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

export function resizeSvg(){
  if(document.querySelector('svg')){
      const svg = document.querySelector('svg')
      const svgHeight = 800
      const svgWidth = 1200
      if(window.innerHeight < svgHeight)
        svg.style.height = String(window.innerHeight - 167)+'px'
      if(window.innerWidth < svgWidth)
        svg.style.width = String(window.innerWidth - 274)+'px'
    }
}


export function highlightCorrespondingUser(target,hoverUser){
  let selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-position]')
  if(hoverUser)hoverUser.classList.remove('hoverUser')
  selectedOfficeUsers.forEach(user=>{
      if(user.dataset.position === target.dataset.position){
          hoverUser = user
          hoverUser.classList.add('hoverUser')
      }
  })
  return hoverUser
}


export function selectUserFromList(target, selectedUser){
  let selectedOfficeUsers = document.querySelectorAll('svg rect[data-user]')
  if(selectedUser)selectedUser.classList.remove('highlighted')
  selectedOfficeUsers.forEach(user=>{
      if(user.dataset.position === target.dataset.position){
          selectedUser = user
          selectedUser.classList.add('highlighted')
      }
  })
  return selectedUser

}