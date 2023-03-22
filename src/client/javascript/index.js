import { selectUser } from "./modules/selectUser.js";tooltipFromList
import { displaySelectedOffice } from "./modules/displaySelectedOffice.js";
import { highlightCorrespondingUser } from "./modules/highlightCorrespondingUser.js";
import { selectUserFromList } from "./modules/selectUserFromList.js";
import { selectCorrespondingListedUser } from "./modules/selectCorrespondingListedUser.js";
import { highlightCorrespondingListedUser } from "./modules/highlightCorrespondingListedUser.js";
import { constructList } from "./modules/constructList.js";
import { updateSelectedOfficeInformation } from "./modules/updateSelectedOfficeInfo.js";
import { tooltip } from "./modules/tooltip.js";
import { tooltipFromList } from "./modules/tooltipFromList.js";
import { autofillText } from "./modules/autofillText.js";
import { deleteText } from "./modules/deleteText.js";
import { queryRequest } from "./modules/queryRequest.js";
import { selectClickedUserFromSearch } from "./modules/selectClickedUserFromSearch.js";
import { resizeSvg } from "./modules/resizeSvg.js";
import { moveInputCursor } from "./modules/moveInputCursor.js";
import { constructOfficeList } from "./modules/constructOfficeList.js";
import { enableCheckBoxes } from './modules/enableCheckboxes.js'
import { disableCheckboxes } from "./modules/disableCheckboxes.js";
import { checkCheckbox } from "./modules/checkCheckbox.js";
import { uncheckCheckbox } from "./modules/uncheckCheckbox.js";
import { selectListedOffice } from "./modules/selectListedOffice.js";
import { appendSvg } from "./modules/appendSvg.js";

export const svgContainer = document.querySelector("#svgs");
export const userTextInput = document.querySelector('#user')
export const outletTextInput = document.querySelector("#dataOutlet");
export const offices = Array.from(document.querySelectorAll('svg'))
    .sort((a, b)=>{                                                           //sorted list by data-office
      return a.dataset.office.localeCompare(b.dataset.office);   
    });
export let selectedOfficeUsersList = document.querySelector('.listedUsers')
export const selectedOffice = document.querySelector('#office')
export const searchBar = document.querySelector('#search')
export const queryResultsList = document.querySelector('.queryResultsList')
export const checkboxes = document.querySelectorAll('input[type="checkbox"]')
export const officesList = document.querySelector('.listedOffices')
const changeButton = document.querySelector('#submitChanges')
document.querySelector('.listedOffices').click()
let selectedUser;
let hoverUser
let selectListedUser
export let checkboxSelection = [
  {checkbox:'AllOffices',isChecked:true},
  {checkbox:'Isogeio',isChecked:false},
  {checkbox:'ProtosOrofos',isChecked:false},
  {checkbox:'DeuterosOrofos',isChecked:false}
]

window.addEventListener('resize',()=>{
  if(document.querySelector('.chosenOffice')){
    const svg = document.querySelector('.chosenOffice')
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
checkboxes.forEach(checkbox=>{
  checkbox.addEventListener('change',async e=>{
    if(e.target.checked  && e.target.dataset.floor === 'AllOffices') disableCheckboxes(e)
    else if(!e.target.checked  && e.target.dataset.floor === 'AllOffices'){
      enableCheckBoxes(e)
      officesList.innerHTML = ''
    } 
    if(e.target.checked){
      checkCheckbox(e)
      const response = await fetch(`/getofficeslist/${JSON.stringify(checkboxSelection)}`)
      constructOfficeList(await response.json())
    }
    else{
      uncheckCheckbox(e)
      const response = await fetch(`/getofficeslist/${JSON.stringify(checkboxSelection)}`)
      constructOfficeList(await response.json())
    }
  })
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



offices.forEach(svg=>{
  officesList.innerHTML += `<li data-office ="${svg.dataset.office}">${svg.dataset.office}</li>`
})


document.querySelector('.listedOffices').addEventListener('click',e=>{
  if(document.querySelectorAll('.listedOffices li')){
    let chosenOfficeListItem
    document.querySelectorAll('.listedOffices li').forEach(office=>{
      office.addEventListener('click',async e=>{
        selectedOfficeUsersList.innerHTML=''
        queryResultsList.innerHTML = ''
        chosenOfficeListItem = selectListedOffice(e.target,chosenOfficeListItem)
        deleteText()
        selectedOffice.innerHTML = displaySelectedOffice(e.target,selectedOffice)
        const userAmount = document.querySelectorAll(`[data-office='${selectedOffice.innerHTML}'] rect[data-position]`)
        resizeSvg()
        const response = await fetch(`/getoffice/${selectedOffice.innerHTML}/${userAmount.length}`)
        const receivedData = await response.json()
        updateSelectedOfficeInformation(receivedData)
        constructList()
        if(e.target.dataset.office){
          const fetchsvg = await fetch(`/getsvgelement/${e.target.dataset.office}`)
          const receivedSvg = await fetchsvg.text()
          appendSvg(receivedSvg)
        }
      })
    })
  }
})
document.querySelector('.listedOffices').click()

// document.querySelectorAll('.listedOffices li').forEach(office=>{
//   office.addEventListener('click',async e=>{
//     selectedOfficeUsersList.innerHTML=''
//     queryResultsList.innerHTML = ''
//     deleteText()
//     selectedOffice.innerHTML = displaySelectedOffice(e.target,selectedOffice)
//     const userAmount = document.querySelectorAll(`[data-office='${selectedOffice.innerHTML}'] rect[data-position]`)
//     resizeSvg()
//     const response = await fetch(`/getoffice/${selectedOffice.innerHTML}/${userAmount.length}`)
//     const receivedData = await response.json()
//     updateSelectedOfficeInformation(receivedData)
//     constructList()

//   })

// })


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
  else if(document.querySelector('.chosenOffice')){
    constructList()
    queryResultsList.innerHTML=''
  }
  setTimeout(queryRequest,300)
})
