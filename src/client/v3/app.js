import { initOfficeList } from "./office-list.js";
import { initOfficeUserDetails } from "./office-user-details.js"
import { initOfficeContent } from "./office-content.js"


initOfficeList(document.querySelector('.office-list-container'))
initOfficeContent(document.querySelector('.office-content'))
initOfficeUserDetails(document.querySelector('.office-user-details'))
