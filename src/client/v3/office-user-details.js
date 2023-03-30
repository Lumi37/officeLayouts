/** @type {HTMLElement} */
let host


export function initOfficeUserDetails(hostElement){
    host = hostElement
    const submitButton = host.querySelector('#submit')
    const userField = host.querySelector('#user')
    const outletField = host.querySelector('#dataOutlet')
    const office = host.querySelector('#office')


    document.addEventListener('office-selection', async e=>{
        office.innerHTML = e.detail
    })
    document.addEventListener('user-selection', e=>{
        userField.value = e.detail.user
        outletField.value = e.detail.outlet 
        outletField.dataset.position = e.detail.position
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
}


