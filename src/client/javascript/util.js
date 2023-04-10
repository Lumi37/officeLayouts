
export function utilities(){
    window.addEventListener('resize',()=>{
        if(document.querySelector('svg')){
          const svg = document.querySelector('svg')
          const windowWidth = window.innerWidth
          const windowHeight = window.innerHeight
          if(windowHeight>801)
            svg.style.height = '800px'
          else
            svg.style.height = String(windowHeight - 167)+'px'
          if(windowWidth>1600)
            svg.style.width = '1200px'
          else
            svg.style.width = String(windowWidth - 450)+'px'
        }
    })
  document.addEventListener('hovered-item',e=> tooltip(e.detail) )
  document.addEventListener('unhovered-item',()=>document.querySelector('.tooltip').remove())
  document.addEventListener('svg-loaded',()=>{
    resizeSvg()
    // enableMagnifyTool()
  })
 
}

   function resizeSvg(){
    if(document.querySelector('svg')){
        const svg = document.querySelector('svg')
        if(window.innerHeight < 800)
          svg.style.height = String(window.innerHeight - 167)+'px'
        if(window.innerWidth < 1600)
          svg.style.width = String(window.innerWidth - 450)+'px'
      }
  }
  
function tooltip(position){
  if(position){
    const tooltip = document.createElement('div')
    const rect = document.querySelector(`rect[data-position="${position}"`)
    if(rect.dataset.displayName)
      tooltip.innerHTML = /*html*/`User: <span>${rect.dataset.displayName}</span>&nbsp;PO: <span>${rect.dataset.outlet}</span>`
    else
      tooltip.innerHTML = /*html*/`User: <span>${rect.dataset.user}</span>&nbsp;PO: <span>${rect.dataset.outlet}</span>`
    tooltip.classList.add('tooltip')
    document.body.appendChild(tooltip)
    const rectBounds = rect.getBoundingClientRect()
    tooltip.style.top = rectBounds.top - 45 + 'px'
    tooltip.style.left = rectBounds.right -125 + 'px'
  }


}
function enableMagnifyTool(){
  const content = document.querySelector('#content')
  const svg = document.querySelector('svg')
  content.addEventListener("keypress", function(e) {
      let x = e.clientX - content.offsetLeft;
      let y = e.clientY - content.offsetTop;
      svg.setAttribute("viewBox", (x - 50) + " " + (y - 50) + " " + "500" + " " + "500");
  });

  content.addEventListener("mouseleave", function(e) {
    svg.setAttribute("viewBox", "-0.5 -0.5 1202 802");
  });
}