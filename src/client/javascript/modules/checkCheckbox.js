import  { checkboxSelection } from '../index.js'

export function checkCheckbox(e){
    checkboxSelection.forEach(checkboxObj=>{
        if(e.target.dataset.floor === checkboxObj.checkbox) 
            checkboxObj.isChecked = true
      })
}