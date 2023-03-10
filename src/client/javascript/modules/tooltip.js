
export function tooltip(selectedOffice,target){
    if(selectedOffice && target.dataset.id ){
        // const selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-id]')
        const tooltip = document.createElement('div')
        tooltip.innerHTML = `User:&nbsp;<span>${target.dataset.user}</span>&nbsp;PO:<span>${target.dataset.outlet}</span>`
        tooltip.classList.add('tooltip')
        document.body.appendChild(tooltip)
        const rectBounds = target.getBoundingClientRect()
        console.log(rectBounds.top)
        console.log(rectBounds.right)
        tooltip.style.top = rectBounds.top - 45 + 'px'
        tooltip.style.left = rectBounds.right -125 + 'px'
    }
}
