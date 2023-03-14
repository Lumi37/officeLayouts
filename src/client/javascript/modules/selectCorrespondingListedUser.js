export function selectCorrespondingListedUser(target,hoverListedUser){
    let selectedOfficeListedUsers = document.querySelectorAll('.userListItem')
    if(hoverListedUser) hoverListedUser.classList.remove('selectUserListItem')
    selectedOfficeListedUsers.forEach(user => {
        if(user.dataset.position === target.dataset.position){
            hoverListedUser = user
            hoverListedUser.classList.add('selectUserListItem')
        }
    })
    return hoverListedUser
}   