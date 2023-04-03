/**@type {HTMLELEMENT} */
let host

/** @type {HTMLLIElement} */
let selected

export async function initOfficeList(hostElement) {
    let filter = ''
    host = hostElement
    const officeFiltersCheckboxes = host.querySelectorAll('input[type="checkbox"]')
    const officeListArr = await fetch(`/offices/?floor=all-offices`).then(res => res.json())
    constructOfficeList(officeListArr)

    officeFiltersCheckboxes.forEach(checkbox=>{
        checkbox.addEventListener('click', async e=>{
            const floor = e.target.dataset.floor
            const checked = e.target.checked
            if( floor === 'all-offices' && checked )
                disableCheckboxes()
            else if( floor === 'all-offices' && !checked ){
                filter = ''
                enableCheckboxes()
            }

            if(!checked)
               filter =  filter.replace(floor,'')
            else
                filter += floor
            

            if(filter){
                const officeListArray = await fetch(`/offices/?floor=${filter}`).then(res => res.json())
                constructOfficeList(officeListArray)
                addEventListenerOnList()
            }else
                host.querySelector('.office-list').innerHTML=''
            const officeFilterChangedEvent = new CustomEvent('office-filter-changed',{bubbles:true})
            host.dispatchEvent(officeFilterChangedEvent)
        })
    })
    
    host.querySelectorAll('ul > li').forEach(li => {
        li.addEventListener('click', e => {
            if(selected)selected.classList.remove('selected')
            e.target.classList.add('selected')
            selected = e.target
            const officeSelectionEvent = new CustomEvent('office-selection', { detail: li.textContent, bubbles: true })
            host.dispatchEvent(officeSelectionEvent)
        })
    })

    document.addEventListener('user-selection-by-search',e=>{
        const office = host.querySelector(`li[data-office ="${e.detail}"]`)
        console.log(office)
        if(selected)selected.classList.remove('selected')
        office.classList.add('selected')
        selected = office
        const officeSelectionEvent = new CustomEvent('office-selection', { detail: office.innerHTML, bubbles: true })
        host.dispatchEvent(officeSelectionEvent)
    })

}



//FUNCTIONS


function disableCheckboxes(){
    host.querySelectorAll('input[type="checkbox"]').forEach(checkbox=>{
        if(!(checkbox.dataset.floor === 'all-offices')){
            checkbox.checked = true
            checkbox.disabled = true
        }
    })
}

function enableCheckboxes(){
    host.querySelectorAll('input[type="checkbox"]').forEach(checkbox=>{
        if(!(checkbox.dataset.floor === 'all-offices')){
            checkbox.checked = false
            checkbox.disabled = false
        }
    })
}

function constructOfficeList(officeListArr){
    const officeList = host.querySelector('.office-list')
    officeList.innerHTML=/*html*/`
    <ul>
        ${officeListArr.map( office => `<li data-office=${office.name}>${office.name}</li>`).join('\n')}
    </ul>`
}

function addEventListenerOnList(){
    host.querySelectorAll('ul > li').forEach(li => {
        li.addEventListener('click', e => {
            if(selected)selected.classList.remove('selected')
            e.target.classList.add('selected')
            selected = e.target
            const officeSelectionEvent = new CustomEvent('office-selection', { detail: li.textContent, bubbles: true })
            host.dispatchEvent(officeSelectionEvent)
        })
    })
}