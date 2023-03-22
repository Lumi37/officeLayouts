import { checkboxes ,checkboxSelection} from "../index.js";

export function disableCheckboxes(e){
  console.log(e.target.dataset.floor)
    checkboxes.forEach(checkbox=>{
        if(!(checkbox.dataset.floor === 'AllOffices')){
          checkbox.checked = true
          checkbox.disabled = true
        }
      })
    checkboxSelection.forEach(checkboxObj=>{
            checkboxObj.isChecked = false
    })

  
}