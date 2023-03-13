import{powerOutletTextInput,userTextInput} from '../index.js'

export function deleteText(){
    powerOutletTextInput.value = ''
    powerOutletTextInput.dataset.id = ''
    userTextInput.value = ''
}