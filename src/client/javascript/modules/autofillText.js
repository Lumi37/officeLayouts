import {outletTextInput,userTextInput} from '../index.js'
export function autofillText(target){
    outletTextInput.value = target.dataset.outlet
    outletTextInput.dataset.position = target.dataset.position
    userTextInput.value = target.dataset.user
}