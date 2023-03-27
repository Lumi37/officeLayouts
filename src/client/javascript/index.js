import { highlightCorrespondingUser } from "./modules/highlightCorrespondingUser.js";
import { selectUserFromList } from "./modules/selectUserFromList.js";
import { selectCorrespondingListedUser } from "./modules/selectCorrespondingListedUser.js";
// import { highlightCorrespondingListedUser } from "./modules/highlightCorrespondingListedUser.js";
import { constructList } from "./modules/constructList.js";
import { updateSelectedOfficeInformation } from "./modules/updateSelectedOfficeInfo.js";
// import { tooltip } from "./modules/tooltip.js";
import { tooltipFromList } from "./modules/tooltipFromList.js";
import { autofillText } from "./modules/autofillText.js";
import { queryRequest } from "./modules/queryRequest.js";
import { selectClickedUserFromSearch } from "./modules/selectClickedUserFromSearch.js";
import { moveInputCursor } from "./modules/mainContentDisplay.js";
import './modules/officeList.js'
import './modules/mainContentDisplay.js'

export const selectedOfficeUsersList = document.querySelector('.listedUsers')
// export const svgContainer = document.querySelector("#svgs");
export const userTextInput = document.querySelector('#user')
export const outletTextInput = document.querySelector("#dataOutlet");
export const selectedOffice = document.querySelector('#office')
export const searchBar = document.querySelector('#search')
export const queryResultsList = document.querySelector('.queryResultsList')
const changeButton = document.querySelector('#submitChanges')
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




selectedOfficeUsersList.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.position){
    hoverUser = highlightCorrespondingUser(e.target,hoverUser)
    tooltipFromList(hoverUser,e.target)
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

queryResultsList.addEventListener('click',async e=>{
  selectedOfficeUsersList.innerHTML=''
  const target = e.target.closest('li[data-office]')
  selectedOffice.innerHTML = displaySelectedOffice(target,selectedOffice)
  const userAmount = document.querySelectorAll(`[data-office='${selectedOffice.innerHTML}'] rect[data-position]`)
  const response = await fetch(`/getoffice/${selectedOffice.innerHTML}/${userAmount.length}`)
  const receivedData = await response.json()
  updateSelectedOfficeInformation(receivedData)
  constructList(target)
  autofillText(target)
  selectClickedUserFromSearch()
  resizeSvg()
  queryResultsList.innerHTML=''
  searchBar.value=''
})

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

userTextInput.addEventListener('keydown',  e=>{
  if(e.key ==='Enter'){
    changeButton.click() 
  }
})

outletTextInput.addEventListener('keydown',e=>{
  if(e.key ==='Enter'){
    changeButton.click()
  }
})

searchBar.addEventListener('keyup',e=>{
  if(searchBar.value)selectedOfficeUsersList.innerHTML = ''
  else if(document.querySelector('svg')){
    constructList()
    queryResultsList.innerHTML=''
  }
  setTimeout(queryRequest,300)
})
