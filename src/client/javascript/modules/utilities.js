


window.addEventListener('resize',()=>{
  if(document.querySelector('svg')){
    const svg = document.querySelector('svg')
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    if(windowHeight>801)
      svg.style.height = '800px'
    else
      svg.style.height = String(windowHeight - 167)+'px'
    if(windowWidth>1201)
      svg.style.width = '1200px'
    else
      svg.style.width = String(windowWidth - 274)+'px'
  }
})

