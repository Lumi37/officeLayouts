
export function tooltip(selectedOffice,target){
    if(selectedOffice && target.dataset.position ){
        const tooltip = document.createElement('div')
        tooltip.innerHTML = `User:<span>${target.dataset.user}</span>&nbsp;PO:<span>${target.dataset.outlet}</span>`
        tooltip.classList.add('tooltip')
        document.body.appendChild(tooltip)
        const rectBounds = target.getBoundingClientRect()
        tooltip.style.top = rectBounds.top - 45 + 'px'
        tooltip.style.left = rectBounds.right -125 + 'px'
    }
}
