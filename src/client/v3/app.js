import { initOfficeList } from "./office-list.js";
import { initOfficeUserDetails } from "./office-user-details.js"
import { initOfficeContent } from "./office-content.js"
import { initUserList } from "./office-user-list.js";
import { initSearchEngine } from "./searchEngine.js";


initOfficeList(document.querySelector('.office-list-container'))
initOfficeContent(document.querySelector('.office-content'))
initOfficeUserDetails(document.querySelector('.office-user-details'))
initUserList(document.querySelector('.office-user-list'))
initSearchEngine(document.querySelector('.office-user-list'))