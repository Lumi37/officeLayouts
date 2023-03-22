
import {checkboxes ,checkboxSelection} from '../index.js'

export function enableCheckBoxes(e){
    checkboxes.forEach(checkbox=>{
        if(!(checkbox.dataset.floor === 'AllOffices')){
          checkbox.checked = false
          checkbox.disabled = false
        }
      })
    checkboxSelection.forEach(checkboxObj=>{
            checkboxObj.isChecked = false
    })
}