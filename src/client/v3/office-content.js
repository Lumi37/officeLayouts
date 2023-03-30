/**@type {HTMLELEMENT} */
let host

/**@type {HTMLELEMENT} */
let selected


export function initOfficeContent(hostElement){
    host = hostElement

    document.addEventListener('office-selection', async e=>{
        const selection = e.detail
        const svg = await fetch(`/getsvgelement/?requestedSvg=${selection}`).then(s=>s.text())
        host.innerHTML = svg
        const officeData = await fetch(`/getofficeinformation/?office=${selection}`).then(o=>o.json())
        matchOfficeDataWithSvg(officeData)
            
        host.querySelectorAll('rect[data-position]').forEach(rect => {
            rect.addEventListener('click',e=>{
                const userData = e.target.dataset
                if(selected)selected.classList.remove('selectedRect')
                e.target.classList.add('selectedRect')
                selected = e.target
                const userSelectionEvent = new CustomEvent('user-selection', { 
                    detail:{
                        user:userData.user,
                        outlet:userData.outlet,
                        position:userData.position
                    }, 
                    bubbles: true })
                host.dispatchEvent(userSelectionEvent)
            })
        }); 
        document.addEventListener('user-updated',e=>{
            updateRectInfo(e.detail)
        })
    })
}



//FUNCTIONS 

function matchOfficeDataWithSvg(data){
    host.querySelectorAll('rect[data-position]').forEach(rect=>{
        for(let i=0; i<data.length; i++){
            if(rect.dataset.position === data[i].position){
                rect.dataset.user = data[i].user
                rect.dataset.outlet = data[i].outlet
            }
        }
    })
}

function updateRectInfo(updatedData){
    host.querySelectorAll('rect[data-position]').forEach(rect=>{
        if(updatedData.position === rect.dataset.position){
            rect.user = updatedData.user
            rect.outlet = updatedData.outlet
        }
    })
}