export function moveInputCursor(){
    const input = document.querySelector('#user')
    input.setSelectionRange(0,0)
    input.focus(); 
}