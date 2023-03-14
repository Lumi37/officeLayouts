import{outletTextInput,userTextInput} from '../index.js'

export function deleteText(){
    outletTextInput.value = ''
    outletTextInput.dataset.position = ''
    userTextInput.value = ''
}