export function tooltipByList(hoverUser){
   const tooltip = document.createElement('div')
    tooltip.innerHTML = `User:<span>${hoverUser.dataset.user}</span>&nbsp;PO:<span>${hoverUser.dataset.outlet}</span>`
    tooltip.classList.add('tooltip')
    document.body.appendChild(tooltip)
    const rectBounds = hoverUser.getBoundingClientRect()
    tooltip.style.top = rectBounds.top - 45 + 'px'
    tooltip.style.left = rectBounds.right -125 + 'px'
}