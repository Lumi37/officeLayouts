export function selectUserFromList(target, selectedUser){
    let selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-user]')
    if(selectedUser)selectedUser.classList.remove('highlighted')
    selectedOfficeUsers.forEach(user=>{
        if(user.dataset.user === target.dataset.user && user.dataset.outlet === target.dataset.outlet ){
            selectedUser = user
            selectedUser.classList.add('highlighted')
        }
    })
    return selectedUser

}