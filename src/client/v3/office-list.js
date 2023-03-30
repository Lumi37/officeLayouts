/**@type {HTMLELEMENT} */
let host

/** @type {HTMLLIElement} */
let selected

export async function initOfficeList(hostElement) {
    host = hostElement
    const officeList = host.querySelector('.office-list')
    const officeListArr = await fetch(`/offices/`).then(res => res.json())
    officeList.innerHTML=/*html*/`
    <ul>
        ${officeListArr.map( office => `<li data-office=${office.name}>${office.name}</li>`).join('\n')}
    </ul>`


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
        console.log(e.detail)
        const office = host.querySelector(`li[data-office ="${e.detail}"]`)
        console.log(office)
        if(selected)selected.classList.remove('selected')
        office.classList.add('selected')
        selected = office
        const officeSelectionEvent = new CustomEvent('office-selection', { detail: office.innerHTML, bubbles: true })
        host.dispatchEvent(officeSelectionEvent)
    })

}
