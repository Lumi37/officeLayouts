import { initOfficeList } from './office-list.js'
import { initOfficeView } from './office-view.js'

initOfficeList(document.querySelector('#office-list-container'))
initOfficeView(document.querySelector('#office-list-view'))

document.addEventListener('office-changed', evt => {
  console.log(evt.detail)
})

