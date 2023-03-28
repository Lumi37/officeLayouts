import { refreshSelectedOfficeInfo } from "./mainContentDisplay.js"
import { constructList } from "./userList.js"


const changeButton = document.querySelector('#submitChanges')
export const selectedOffice = document.querySelector('#office')
export const userTextInput = document.querySelector('#user')
export const outletTextInput = document.querySelector("#dataOutlet");

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
    refreshSelectedOfficeInfo(receivedData)
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


