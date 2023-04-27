
export function utilities(){
  windowEventSvgResizing()
  document.addEventListener('hovered-item',e=> tooltip(e.detail) )
  document.addEventListener('unhovered-item',()=>document.querySelector('.tooltip').remove())
  document.addEventListener('svg-office-loaded',()=>resizeSvg())
  document.addEventListener('svg-floor-loaded',()=>{
     resizeOverviewSvg()
     displayAvailableOffices()
  })
 
}
  
   function resizeOverviewSvg(){
    if(document.querySelector('svg')){
      const svgs = document.querySelectorAll('svg')
      if(svgs.length === 1){
        svgs.forEach(svg=>{
          content.classList.remove('grid-content')
          content.classList.add('flex-content')
          svg.style.height = String(799)+'px'
          svg.style.width = String(1199)+'px'
        })
      }
      if(svgs.length === 2){
          svgs.forEach(svg=>{
            content.classList.remove('grid-content')
            content.classList.add('flex-content')
            svg.style.height = String(600)+'px'
            svg.style.width = String(800)+'px'
          })
      }
      if(svgs.length === 3){
        if(svgs.length === 3){
          if(window.innerWidth>1600){
            svgs.forEach(svg=>{
              content.classList.remove('flex-content')
              content.classList.add('grid-content')
              svg.style.height = String(450)+'px'
              svg.style.width = String(650)+'px'
            })
          }else{
            svgs.forEach(svg=>{
              content.classList.remove('grid-content')
              content.classList.add('flex-content')
              svg.style.height = String(450)+'px'
              svg.style.width = String(650)+'px'
            })
          }
  
        }
      }
    }
      
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

function displayAvailableOffices(){
  
  let occupiedOffices = []
  let allOffices = []
  const allOfficesRects = document.querySelectorAll('rect[data-office]')
  const allOfficesTexts = document.querySelectorAll('text[data-office]')
  document.querySelectorAll('li[data-office]').forEach(li=>{
    occupiedOffices.push(li.dataset.office)
  })
  allOfficesRects.forEach(rect=>{
    allOffices.push(rect.dataset.office)
  })
  const unoccupiedOffices = allOffices.filter(office=>!(occupiedOffices.includes(office)))
  allOfficesRects.forEach(rect=>{
    const rectOffice = rect.dataset.office
    for(let i = 0; i < unoccupiedOffices.length; i++){
      if(rectOffice === unoccupiedOffices[i]){
        rect.classList.add('unoccupied-office')
      }
    }
  })
  allOfficesTexts.forEach(text=>{
    const textOffice = text.dataset.office
    for(let i = 0; i < unoccupiedOffices.length; i++){
      if(textOffice === unoccupiedOffices[i]){
        text.classList.add('unoccupied-office-text')
      }
    }
  })
}
function windowEventSvgResizing(){
  window.addEventListener('resize',()=>{
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    if(document.querySelectorAll('svg').length>1){
      const svgs = document.querySelectorAll('svg')
      const content = document.querySelector('#content')
      if(windowWidth<1700){
        content.classList.remove('grid-content')
        content.classList.add('flex-content')
       }else{
        content.classList.remove('flex-content')
        content.classList.add('grid-content')
       }
      if(windowHeight<650){
        svgs.forEach(svg=>{
          svg.style.height = windowHeight/3 +'px'
        })
      }else{
        svgs.forEach(svg=>{
          svg.style.height = String(450)+'px'
        })
      }
      if(windowWidth<1040){
        svgs.forEach(svg=>{
          svg.style.width = windowWidth -400+'px'
          svg.style.height = svg.style.height - 50 + 'px'
        })
      }else{
        svgs.forEach(svg=>{
          svg.style.width = String(650)+'px'
        })
      }
    } 
    else if(document.querySelector('svg')){
        const svg = document.querySelector('svg')
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
}