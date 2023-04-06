
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
        const svgLoadedEvent = new CustomEvent('svg-loaded',{bubbles:true})
        host.dispatchEvent(svgLoadedEvent)
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
            rect.addEventListener('mouseover',e=>{
                const hoveredRect = e.target
                const hoverEvent = new CustomEvent('hovered-item',{
                    detail:hoveredRect.dataset.position,
                    bubbles:true
                })
                host.dispatchEvent(hoverEvent)
            })
            rect.addEventListener('mouseout',e=>{
                const hoverEvent = new CustomEvent('unhovered-item',{bubbles:true})
                host.dispatchEvent(hoverEvent)
            })
        });
        document.addEventListener('office-filter-changed',()=>host.innerHTML='')
        document.addEventListener('user-updated',async e=>{
            await updateRectInfo(e.detail)
            const updatedOfficeData = await fetch(`/getofficeinformation/?office=${selection}`).then(o=>o.json())
            matchOfficeDataWithSvg(updatedOfficeData) 
        })
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
                if(data[i].displayName){
                    rect.setAttribute('type', 'displayName')
                    rect.setAttribute('type', 'cn')
                    rect.dataset.displayName = data[i].displayName
                    rect.dataset.cn = data[i].cn
                }
            }
        }
    })
}

async function updateRectInfo(updatedData){
    host.querySelectorAll('rect[data-position]').forEach(rect=>{
        if(updatedData.position === rect.dataset.position){
            rect.dataset.user = updatedData.user
            rect.dataset.outlet = updatedData.outlet
        }
    })
}
