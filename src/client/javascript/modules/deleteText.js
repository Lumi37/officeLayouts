import{outletTextInput,userTextInput} from './editUser.js'

export function deleteText(){
    outletTextInput.value = ''
    outletTextInput.dataset.position = ''
    userTextInput.value = ''
}