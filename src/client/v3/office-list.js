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
        ${officeListArr.map( office => `<li>${office.name}</li>`).join('\n')}
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

}
