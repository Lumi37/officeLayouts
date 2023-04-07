import { downloadCsv, downloadSvg } from "./lib.js"
/** @type {HTMLElement} */
let host


export function initOfficeUserDetails(hostElement){
    host = hostElement
    const user = host.querySelector('.office-user')
    const submitButton = host.querySelector('#submit')
    const userField = host.querySelector('#user')
    const outletField = host.querySelector('#dataOutlet')
    const office = host.querySelector('#office')
    const officeDownloadCsv = host.querySelector('#downloadCsv')
    const officeDownloadSvg = host.querySelector('#downloadSvg')


    document.addEventListener('office-selection', e=>{
        office.innerHTML = e.detail
        userField.value  = ''
        outletField.value = ''
        outletField.dataset.position=''
        user.style.visibility = 'hidden'
    })
    document.addEventListener('office-filter-changed',()=>{
        office.innerHTML = ''
        userField.value  = ''
        outletField.value = ''
        outletField.dataset.position=''
        user.style.visibility = 'hidden'

    })
    document.addEventListener('user-selection', e=>{
        userField.value = e.detail.user
        outletField.value = e.detail.outlet 
        outletField.dataset.position = e.detail.position
        user.style.visibility = 'visible'
        userField.select()
    })

    submitButton.addEventListener('click', async e=>{
        if(outletField.dataset.position){
            const userInfo = {
                    method:'POST',
                    headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify({
                        user: userField.value.trim(),
                        outlet: outletField.value.trim(),
                        office: office.innerHTML,
                        position: outletField.dataset.position
                    })
            }
            await fetch('/updateuserinfo/',userInfo)
            const updatedUserInformationEvent = new CustomEvent('user-updated',{
                detail:{
                    user: userField.value.trim(),
                    outlet: outletField.value.trim(),
                    office: office.innerHTML,
                    position: outletField.dataset.position
                },
                bubbles:true
            })
            host.dispatchEvent(updatedUserInformationEvent)
        }

            
         })
    userField.addEventListener('keyup',e=>{
        if(e.key === 'Enter') submitButton.click()
    })
    
    outletField.addEventListener('keyup',e=>{
        if(e.key === 'Enter')  submitButton.click()
    })
    
    officeDownloadCsv.addEventListener('click',async e=>{
        if(office.innerHTML){
            const data = await fetch(`/download-selected-office/?office=${office.innerHTML}`);
            downloadCsv(data,office.innerHTML)
        }
            
    })
    officeDownloadSvg.addEventListener('click',async e=>{
        if(office.innerHTML)
            downloadSvg(office.innerHTML)        
    })


}


