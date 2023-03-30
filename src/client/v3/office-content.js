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
                const userSelectionByRect = new CustomEvent('user-selection-by-rect',{ detail:userData.position, bubbles:true})
                host.dispatchEvent(userSelectionByRect)
            })
        }); 
        document.addEventListener('user-updated',e=> updateRectInfo(e.detail) )
        document.addEventListener('user-selection-by-list',e=>{
            const userRect = host.querySelector(`rect[data-position="${e.detail}"]`)
            if(selected)selected.classList.remove('selectedRect')
            userRect.classList.add('selectedRect')
            selected = userRect
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
            rect.dataset.user = updatedData.user
            rect.dataset.outlet = updatedData.outlet
        }
    })
}