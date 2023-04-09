export async function downloadCsv(data, filename) {
    const blob = await data.text()
    .then(async d=> new Blob([`\uFEFF${d}`], { type: 'text/csv; charset=utf-8;' }))
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

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