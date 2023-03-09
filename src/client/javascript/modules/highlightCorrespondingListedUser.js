export function highlightCorrespondingListedUser(target,hoverListedUser){
    let selectedOfficeListedUsers = document.querySelectorAll('.userListItem')
    if(hoverListedUser) hoverListedUser.classList.remove('hoverUserListItem')
    selectedOfficeListedUsers.forEach(user => {
        if(user.dataset.user === target.dataset.user && user.dataset.outlet === target.dataset.outlet)
            hoverListedUser = user
            hoverListedUser.classList.add('hoverUserListItem')
    })
    return hoverListedUser
}   