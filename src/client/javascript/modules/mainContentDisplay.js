// import { deleteText,autofillText,selectUser,selectCorrespondingListedUser,moveInputCursor} from "./utilities.js";

export const svgContainer = document.querySelector("#svgs");
let selectedUser;
let selectListedUser



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


  
