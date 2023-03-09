export function highlightCorrespondingUser(target,hoverUser){
    let selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-user]')
    if(hoverUser)hoverUser.classList.remove('hoverUser')
    selectedOfficeUsers.forEach(user=>{
        console.log(user.dataset.user === target.dataset.user && user.dataset.outlet === target.dataset.outlet)
        if(user.dataset.user === target.dataset.user && user.dataset.outlet === target.dataset.outlet){
            hoverUser = user
            hoverUser.classList.add('hoverUser')
        }
    })
    return hoverUser
}