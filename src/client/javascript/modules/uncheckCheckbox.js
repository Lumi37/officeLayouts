import { checkboxSelection } from "../index.js"

export function uncheckCheckbox(e){
    checkboxSelection.forEach(checkboxObj=>{
        if(e.target.dataset.floor === checkboxObj.checkbox)
         checkboxObj.isChecked = false 
      })
}