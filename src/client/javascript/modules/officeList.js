import { constructList,selectedOfficeUsersList } from "./userList.js"
import { deleteText,resizeSvg } from "./utilities.js"
import {queryResultsList}  from "./searchEngine.js"
import {selectedOffice} from "./editUser.js"
import { refreshSelectedOfficeInfo } from "./mainContentDisplay.js"


const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const officesList = document.querySelector('.listedOffices')
let chosenOfficeListItem
let checkboxSelection = [
  {checkbox:'AllOffices',isChecked:true},
  {checkbox:'Isogeio',isChecked:false},
  {checkbox:'ProtosOrofos',isChecked:false},
  {checkbox:'DeuterosOrofos',isChecked:false}
]
const allOfficesReq = await  fetch(`/getofficeslist/${JSON.stringify(checkboxSelection)}`)
renderOfficeList(await allOfficesReq.json())
listedOffices()

checkboxes.forEach(checkbox=>{
    checkbox.addEventListener('change',async e=>{
        if(e.target.checked  && e.target.dataset.floor === 'AllOffices')
            disableCheckboxes()
        else if(!e.target.checked  && e.target.dataset.floor === 'AllOffices'){
            enableCheckBoxes()
            officesList.innerHTML = ''
        } 
        if(e.target.checked){
            checkCheckbox(e)
            const response = await fetch(`/getofficeslist/${JSON.stringify(checkboxSelection)}`)
            renderOfficeList(await response.json())
            listedOffices()
        }
        else{
            uncheckCheckbox(e)
            const response = await fetch(`/getofficeslist/${JSON.stringify(checkboxSelection)}`)
            renderOfficeList(await response.json())
            listedOffices()
        }
    })
})





//FUNCTIONS

function listedOffices(){
    document.querySelectorAll('.listedOffices li').forEach(office=>{
        office.addEventListener('click',async e=>{
            selectedOfficeUsersList.innerHTML=''
            queryResultsList.innerHTML = ''
            chosenOfficeListItem = selectListedOffice(e.target,chosenOfficeListItem)
            deleteText()
            selectedOffice.innerHTML = chosenOfficeListItem.dataset.office
            const userAmount = document.querySelectorAll(`[data-office='${selectedOffice.innerHTML}'] rect[data-position]`)
            const fetchSvg = await fetch(`/getsvgelement/${e.target.dataset.office}`)
            const receivedSvg = await fetchSvg.text()
            appendSvg(receivedSvg)
            resizeSvg()
            const fetchOffice = await fetch(`/getoffice/${selectedOffice.innerHTML}/${userAmount.length}`)
            const receivedOffice = await fetchOffice.json()
            refreshSelectedOfficeInfo(receivedOffice)
            constructList()
        })
    })
}



function appendSvg(svg){ 
    document.querySelector('.svgContainer').innerHTML = svg
}


function enableCheckBoxes(){
    checkboxes.forEach(checkbox=>{
        if(!(checkbox.dataset.floor === 'AllOffices')){
          checkbox.checked = false
          checkbox.disabled = false
        }
      })
    checkboxSelection.forEach(checkboxObj=>{
            checkboxObj.isChecked = false
    })
}

function disableCheckboxes(){
    checkboxes.forEach(checkbox=>{
        if(!(checkbox.dataset.floor === 'AllOffices')){
          checkbox.checked = true
          checkbox.disabled = true
        }
      })
    checkboxSelection.forEach(checkboxObj=>{
            checkboxObj.isChecked = false
    })
}

function checkCheckbox(e){
    checkboxSelection.forEach(checkboxObj=>{
        if(e.target.dataset.floor === checkboxObj.checkbox) 
            checkboxObj.isChecked = true
      })
}

function uncheckCheckbox(e){
    checkboxSelection.forEach(checkboxObj=>{
        if(e.target.dataset.floor === checkboxObj.checkbox)
         checkboxObj.isChecked = false 
      })
}

function renderOfficeList(list){
    officesList.innerHTML= ''
    list.forEach( office => {
        officesList.innerHTML+= /*html*/`
            <li data-office ="${office}">${office}</li>`
        
    });
}

function selectListedOffice(target,chosenOfficeListItem){
    if(chosenOfficeListItem) chosenOfficeListItem.classList.remove('chosenOfficeListItem')
    chosenOfficeListItem = target
    chosenOfficeListItem.classList.add('chosenOfficeListItem')
    return chosenOfficeListItem
}

