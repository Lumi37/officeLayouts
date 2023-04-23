
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
  document.addEventListener('svg-office-loaded',()=>resizeSvg())
  document.addEventListener('svg-floor-loaded',(e)=>displayOfficeNames(e.detail))
 
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

function displayOfficeNames(allOffices){
  let occupiedOffices = []
  const allOfficesRects = document.querySelectorAll('rect[data-office]')
  const content = document.querySelector('.office-content')
  document.querySelectorAll('li[data-office]').forEach(li=>{
    occupiedOffices.push(li.dataset.office)
  })
  const unoccupiedOffices = allOffices.filter(office=>!(occupiedOffices.includes(office)))
  allOfficesRects.forEach(rect=>{
    const rectOffice = rect.dataset.office
    for(let i = 0; i < unoccupiedOffices.length; i++){
      if(rectOffice === unoccupiedOffices[i]){
        rect.classList.add('unoccupied-office')
      }
    const officeNameBox = document.createElement('div')
    officeNameBox.classList.add('officeNameBox')
    content.appendChild(officeNameBox)
    const rectBounds = rect.getBoundingClientRect()
    officeNameBox.style.top = rectBounds.top+'px'
    officeNameBox.style.left = rectBounds.right  +'px'
    
    }
  })
}