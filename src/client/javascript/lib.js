export async function downloadCsv(data, filename) {
    console.log(typeof(data))
    const blob = await data.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
//must already exist on document
export async function downloadSvg(office) {
    const svgElement = document.querySelector('svg');
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${office}.svg`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  }