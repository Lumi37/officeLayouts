/** @type {HTMLElement} */
let host

/** @type {HTMLLIElement} */
let selected

export async function initOfficeList(hostElement) {
  host = hostElement
  const officeList = host.querySelector('#office-list')
  const officeListArr = await fetch(`/getofficeslistall/`).then(r => r.json())
  officeList.innerHTML = /*html*/`
    <ul>
      ${officeListArr.map(o => `<li>${o}</li>`).join('\n')}
    </ul>
  `
  host.querySelectorAll('ul > li').forEach(li => {
    li.addEventListener('click', evt => {
      if (selected) selected.classList.remove('selected')
      li.classList.add('selected')
      selected = li
      const officeChangedEvent = new CustomEvent('office-changed', { detail: li.textContent, bubbles: true })
      host.dispatchEvent(officeChangedEvent)
    })
  })
}
