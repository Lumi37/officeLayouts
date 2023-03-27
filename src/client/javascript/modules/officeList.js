import { constructList } from "./constructList.js"
import { deleteText } from "./deleteText.js"
import { selectedOfficeUsersList } from "../index.js"
import {queryResultsList}  from "../index.js"
import {selectedOffice} from "../index.js"
import { updateSelectedOfficeInformation } from "./updateSelectedOfficeInfo.js"


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
        }
        else{
            uncheckCheckbox(e)
            const response = await fetch(`/getofficeslist/${JSON.stringify(checkboxSelection)}`)
            renderOfficeList(await response.json())
        }
    })
})



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
        updateSelectedOfficeInformation(receivedOffice)
        constructList()
    })
})




//FUNCTIONS


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

function resizeSvg(){
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