let host

document.addEventListener('office-changed', evt => {
  host.querySelector('h2').textContent = evt.detail
})


export function initOfficeView(hostElement) {
  host = hostElement
}