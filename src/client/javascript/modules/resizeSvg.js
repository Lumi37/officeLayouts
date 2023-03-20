export function resizeSvg(){
    if(document.querySelector('.chosenOffice')){
        const svg = document.querySelector('.chosenOffice')
        const svgHeight = 800
        const svgWidth = 1200
        if(window.innerHeight < svgHeight)
          svg.style.height = String(window.innerHeight - 167)+'px'
        console.log(window.innerWidth < svgWidth)
        if(window.innerWidth < svgWidth)
          svg.style.width = String(window.innerWidth - 274)+'px'
      }
}