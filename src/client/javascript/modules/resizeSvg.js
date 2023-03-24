export function resizeSvg(){
    if(document.querySelector('svg')){
        const svg = document.querySelector('svg')
        const svgHeight = 800
        const svgWidth = 1200
        if(window.innerHeight < svgHeight)
          svg.style.height = String(window.innerHeight - 167)+'px'
        if(window.innerWidth < svgWidth)
          svg.style.width = String(window.innerWidth - 274)+'px'
      }
}