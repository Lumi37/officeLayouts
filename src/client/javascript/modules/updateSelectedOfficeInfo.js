export function updateSelectedOfficeInformation(updatedInfo){
    const selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-position]')
    for(let i=0; i<updatedInfo.length; i++)
        selectedOfficeUsers.forEach(user=>{
            if(user.dataset.position === updatedInfo[i].position){
                user.dataset.user = updatedInfo[i].user
                user.dataset.outlet = updatedInfo[i].outlet
            }

    })
}