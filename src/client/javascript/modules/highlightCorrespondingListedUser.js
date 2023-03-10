export function highlightCorrespondingListedUser(target, hoverListedUser){
    let selectedOfficeListedUsers = document.querySelectorAll('.userListItem') 
    if(hoverListedUser)hoverListedUser.classList.remove('highlightUserListItem')
    selectedOfficeListedUsers.forEach(user =>{
        if(user.dataset.id === target.dataset.id){
            hoverListedUser = user 
            hoverListedUser.classList.add('highlightUserListItem')
        }
    })
    return hoverListedUser 
}