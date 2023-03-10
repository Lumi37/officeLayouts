export function highlightCorrespondingUser(target,hoverUser){
    let selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-user]')
    if(hoverUser)hoverUser.classList.remove('hoverUser')
    selectedOfficeUsers.forEach(user=>{
        if(user.dataset.id === target.dataset.id){
            hoverUser = user
            hoverUser.classList.add('hoverUser')
        }
    })
    return hoverUser
}