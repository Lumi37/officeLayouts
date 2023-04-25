
export function utilities(){
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
        if(windowHeight<870){
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
       
      //   svgs.forEach(svg=>{
      //     svg.style.height = String(windowHeight - 167)+'px'
      //     svg.style.width = String(windowWidth - 450 )+'px'
      // })
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
  document.addEventListener('hovered-item',e=> tooltip(e.detail) )
  document.addEventListener('unhovered-item',()=>document.querySelector('.tooltip').remove())
  document.addEventListener('svg-office-loaded',()=>resizeSvg())
  document.addEventListener('svg-floor-loaded',(e)=>{
     resizeOverviewSvg()
    //  displayOfficeNames(e.detail)
  })
 
}
  
   function resizeOverviewSvg(){
    if(document.querySelector('svg')){
      const svgs = document.querySelectorAll('svg')
      svgs.forEach(svg=>{
        svg.style.height = String(450)+'px'
        svg.style.width = String(650)+'px'
      })
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

function displayOfficeNames(allOffices){
  
  let occupiedOffices = []
  const allOfficesRects = document.querySelectorAll('rect[data-office]')
  const svg1 = document.querySelector('div[data-floor="a-floor"]')
  const svg2 = document.querySelector('div[data-floor="b-floor"]')
  const svg3 = document.querySelector('div[data-floor="ground-floor"]')
  
  // const svg1 = document.querySelector('svg[data-floor="a-floor"]')
  // const svg2 = document.querySelector('svg[data-floor="b-floor"]')
  // const svg3 = document.querySelector('svg[data-floor="ground-floor"]')
  
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
    }
    if((rect.dataset.office).startsWith('A')){
      const officeName = document.createElement('div')
      const rectBounds = rect.getBoundingClientRect()
      // officeName.setAttribute("x", rect.getAttribute("x"));
      // officeName.setAttribute("y", rect.getAttribute("y"));
      if(rect.getAttribute('transform')){
        officeName.classList.add('officeName')
        officeName.textContent = rect.getAttribute("data-office");
        officeName.style.top = rectBounds.top  + (rect.getAttribute('width')/4) + 'px'
        officeName.style.left = rectBounds.right - (rect.getAttribute('height')/4) + 'px'
      }else{
        officeName.classList.add('officeName')
        officeName.textContent = rect.getAttribute("data-office");
        officeName.style.top = rectBounds.top  + 'px'
        officeName.style.left = rectBounds.right  + 'px'
      }
      
      svg1.appendChild(officeName);
    }
    if((rect.dataset.office).startsWith('B')){
      const officeName = document.createElement('div')
      const rectBounds = rect.getBoundingClientRect()
      if(rect.getAttribute('transform')){
        officeName.classList.add('officeName')
        officeName.textContent = rect.getAttribute("data-office");
        officeName.style.top = rectBounds.top  + (rect.getAttribute('width')/4) + 'px'
        officeName.style.left = rectBounds.right - (rect.getAttribute('height')/4) + 'px'
      }else{
        officeName.classList.add('officeName')
        officeName.textContent = rect.getAttribute("data-office");
        officeName.style.top = rectBounds.top  + (rect.getAttribute('height')/4) + 'px'
        officeName.style.left = rectBounds.right - (rect.getAttribute('width')/4) + 'px'
      }
      // officeName.setAttribute("x", rect.getAttribute("x"));
      // officeName.setAttribute("y", rect.getAttribute("y"));
      
      svg2.appendChild(officeName);
    }

    if((rect.dataset.office).startsWith('I') || (rect.dataset.office).startsWith('m') || (rect.dataset.office).startsWith('d')){
      const officeName = document.createElement('div')
      const rectBounds = rect.getBoundingClientRect()
      // officeName.setAttribute("x", rect.getAttribute("x"));
      // officeName.setAttribute("y", rect.getAttribute("y"));
      if(rect.getAttribute('transform')){
        officeName.classList.add('officeName')
        officeName.textContent = rect.getAttribute("data-office");
        officeName.style.top = rectBounds.top  + (rect.getAttribute('width')/4) + 'px'
        officeName.style.left = rectBounds.right - (rect.getAttribute('height')/4) + 'px'
      }else{
        officeName.classList.add('officeName')
        officeName.textContent = rect.getAttribute("data-office");
        officeName.style.top = rectBounds.top  + 'px'
        officeName.style.left = rectBounds.right  + 'px'
      }
      svg3.appendChild(officeName);
    }
    // if((rect.dataset.office).startsWith('A')){
    //   const officeName = document.createElementNS("http://www.w3.org/2000/svg", "text");
    //   const rectBounds = rect.getBoundingClientRect()
    //   officeName.setAttribute("x", rect.getAttribute("x"));
    //   officeName.setAttribute("y", rect.getAttribute("y"));
    //   officeName.setAttribute('fill','white')
    //   officeName.setAttribute('transform',"rotate(90,185,590)") //transform="rotate(0,185,590)"
    //   officeName.setAttribute("text-anchor", "middle");
    //   officeName.setAttribute("dominant-baseline", "central");
    //   officeName.classList.add('officeName')
    //   officeName.textContent = rect.getAttribute("data-office");
    //   svg1.appendChild(officeName);
    // }
    // if((rect.dataset.office).startsWith('B')){
    //   const officeName = document.createElementNS("http://www.w3.org/2000/svg", "text");
    //   officeName.setAttribute("x", rect.getAttribute("x"));
    //   officeName.setAttribute("y", rect.getAttribute("y"));
    //   officeName.setAttribute("text-anchor", "middle");
    //   officeName.setAttribute("dominant-baseline", "central");
    //   officeName.classList.add('officeName')
    //   officeName.textContent = rect.getAttribute("data-office");
    //   svg2.appendChild(officeName);
    // }

    // if((rect.dataset.office).startsWith('I') || (rect.dataset.office).startsWith('m') || (rect.dataset.office).startsWith('d')){
    //   const officeName = document.createElementNS("http://www.w3.org/2000/svg", "text");
    //   officeName.setAttribute("x", rect.getAttribute("x"));
    //   officeName.setAttribute("y", rect.getAttribute("y"));
    //   officeName.setAttribute("text-anchor", "middle");
    //   officeName.setAttribute("dominant-baseline", "central");
    //   officeName.classList.add('officeName')
    //   officeName.textContent = rect.getAttribute("data-office");
    //   svg3.appendChild(officeName);
    // }



    //   if((rect.dataset.office).startsWith('A')){
    //   const officeNameBox = document.createElement('div')
    //   officeNameBox.classList.add('officeNameBox')
    //   content[2].appendChild(officeNameBox)
    //   const rectBounds = rect.getBoundingClientRect()
    //   officeNameBox.style.top = rectBounds.top+'px'
    //   officeNameBox.style.left = rectBounds.right  +'px'
    // }
    //   if((rect.dataset.office).startsWith('B')){
    //   const officeNameBox = document.createElement('div')
    //   officeNameBox.classList.add('officeNameBox')
    //   content[2].appendChild(officeNameBox)
    //   const rectBounds = rect.getBoundingClientRect()
    //   officeNameBox.style.top = rectBounds.top+'px'
    //   officeNameBox.style.left = rectBounds.right  +'px'
    // }
    // if((rect.dataset.office).startsWith('I') || (rect.dataset.office).startsWith('m')){
    //   const officeNameBox = document.createElement('div')
    //   officeNameBox.classList.add('officeNameBox')
    //   content[2].appendChild(officeNameBox)
    //   const rectBounds = rect.getBoundingClientRect()
    //   officeNameBox.style.top = rectBounds.top+'px'
    //   officeNameBox.style.left = rectBounds.right  +'px'
    // }
    
    
  })
}