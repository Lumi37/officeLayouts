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

            
        host.querySelectorAll('rect[data-position]').forEach(rect => {
            rect.addEventListener('click',e=>{
                if(selected)selected.classList.remove('selectedRect')
                e.target.classList.add('selectedRect')
                selected = e.target
            })
        });
        
    })


}


