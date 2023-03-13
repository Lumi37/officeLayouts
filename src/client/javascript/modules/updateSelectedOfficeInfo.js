export function updateSelectedOfficeInformation(updatedInfo){
    const selectedOfficeUsers = document.querySelectorAll('.chosenOffice rect[data-id]')
    for(let i=0; i<updatedInfo.length; i++)
        selectedOfficeUsers.forEach(user=>{
            if(user.dataset.id === updatedInfo[i].id){
                user.dataset.user = updatedInfo[i].user
                user.dataset.outlet = updatedInfo[i].outlet
            }

    })
}