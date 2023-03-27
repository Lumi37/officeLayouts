import { highlightCorrespondingUser } from "./modules/highlightCorrespondingUser.js";
import { selectUserFromList } from "./modules/selectUserFromList.js";
import { selectCorrespondingListedUser } from "./modules/selectCorrespondingListedUser.js";
import { tooltipFromList } from "./modules/tooltipFromList.js";
import { autofillText } from "./modules/autofillText.js";
import { moveInputCursor } from "./modules/mainContentDisplay.js";
import './modules/officeList.js'
import './modules/mainContentDisplay.js'
import './modules/searchEngine.js'
import './modules/editUser.js'


// export const svgContainer = document.querySelector("#svgs");

export const selectedOffice = document.querySelector('#office')
export const selectedOfficeUsersList = document.querySelector('.listedUsers')
let selectedUser;
let hoverUser
let selectListedUser





selectedOfficeUsersList.addEventListener('mouseover' ,e=>{
  if(e.target.dataset.position){
    hoverUser = highlightCorrespondingUser(e.target,hoverUser)
    tooltipFromList(hoverUser,e.target)
  }
})

selectedOfficeUsersList.addEventListener('mouseout',e=>{
  if(hoverUser){
    hoverUser.classList.remove('hoverUser')
    const tooltip = document.querySelector('.tooltip');
    if(tooltip) tooltip.remove()
    
  }
})

selectedOfficeUsersList.addEventListener("click", (e) => {
    selectedUser = selectUserFromList(e.target.closest('li[data-user]'), selectedUser);
    selectListedUser = selectCorrespondingListedUser(e.target.closest('li[data-user]'), selectListedUser)
    autofillText(e.target.closest('li[data-position]'))
    moveInputCursor()
});


