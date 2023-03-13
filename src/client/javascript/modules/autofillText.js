import {powerOutletTextInput,userTextInput} from '../index.js'
export function autofillText(target){
    powerOutletTextInput.value = target.dataset.outlet
    powerOutletTextInput.dataset.id = target.dataset.id
    userTextInput.value = target.dataset.user
}