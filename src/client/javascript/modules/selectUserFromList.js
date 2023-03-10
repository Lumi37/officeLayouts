export function selectUserFromList(target, selectedUser){
    let selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-user]')
    if(selectedUser)selectedUser.classList.remove('highlighted')
    selectedOfficeUsers.forEach(user=>{
        if(user.dataset.id === target.dataset.id){
            selectedUser = user
            selectedUser.classList.add('highlighted')
        }
    })
    return selectedUser

}