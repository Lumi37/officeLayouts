
/**@type {HTMLELEMENT} */
let host

/**@type {HTMLELEMENT} */
let selected


export function initOfficeContent(hostElement){
    host = hostElement
    const content =  host.querySelector('#content')
    document.addEventListener('office-selection', async e=>{
        const selection = e.detail
        const svg = await fetch(`/getsvgelement/?requestedSvg=${selection}`).then(s=>s.text())
        content.innerHTML = svg
        const svgLoadedEvent = new CustomEvent('svg-loaded',{bubbles:true})
        host.dispatchEvent(svgLoadedEvent)
        await fetch(`/getofficeinformation/?office=${selection}`)
            .then(async o=> await matchOfficeDataWithSvg(await o.json()))
            .then(()=>emitSvgContentInfoToList())
      
        
        
            
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
                const userSelectionByRectEvent = new CustomEvent('user-selection-by-rect',{ detail:userData.position, bubbles:true})
                host.dispatchEvent(userSelectionByRectEvent)
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
        document.addEventListener('office-filter-changed',()=>content.innerHTML='')
        document.addEventListener('user-updated',async e=>{
            await updateRectInfo(e.detail)
            .then(async()=>await fetch(`/getofficeinformation/?office=${selection}`))
            .then(async o=> await matchOfficeDataWithSvg(await o.json()))
            .then(emitSvgContentInfoToList())
       
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

async function  matchOfficeDataWithSvg(data){
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

function emitSvgContentInfoToList(){
    let svgContentInfo = []
    host.querySelectorAll('rect[data-position]').forEach(rect=>{
        let user = rect.dataset
        if(user.displayName)
            svgContentInfo.push({ 
                    user:user.user,
                    outlet:user.outlet,
                    position:user.position,
                    cn:user.cn,
                    displayName:user.displayname
            })
        else
            svgContentInfo.push({ 
                user:user.user,
                outlet:user.outlet,
                position:user.position
            })
    })
    // console.log(svgContentInfo)
    const contentReceivedEvent = new CustomEvent('content-received',{
        detail:svgContentInfo,
        bubbles:true
    })
    host.dispatchEvent(contentReceivedEvent)
}