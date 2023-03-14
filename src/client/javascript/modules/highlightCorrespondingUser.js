export function highlightCorrespondingUser(target,hoverUser){
    let selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-position]')
    if(hoverUser)hoverUser.classList.remove('hoverUser')
    selectedOfficeUsers.forEach(user=>{
        if(user.dataset.position === target.dataset.position){
            hoverUser = user
            hoverUser.classList.add('hoverUser')
        }
    })
    return hoverUser
}