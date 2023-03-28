import { deleteText,autofillText,selectUser,selectCorrespondingListedUser,moveInputCursor} from "./utilities.js";

export const svgContainer = document.querySelector("#svgs");
let selectedUser;
let selectListedUser

svgContainer.addEventListener("click", (e) => {
  if (e.target.dataset.position) {
    selectedUser = selectUser(e.target, selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target, selectListedUser)
    moveInputCursor()
    autofillText(e.target)
  } else {
    selectedUser = selectUser(e.target, selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target, selectListedUser)
    deleteText()
  }
});


export async function  refreshSelectedOfficeInfo(updatedInfo){
  const selectedOfficeUsers = document.querySelectorAll('rect[data-position]')
  for(let i=0; i<updatedInfo.length; i++)
      selectedOfficeUsers.forEach(user=>{
          if(user.dataset.position === updatedInfo[i].position){
              user.dataset.user = updatedInfo[i].user
              user.dataset.outlet = updatedInfo[i].outlet
          }

  })
}


  
