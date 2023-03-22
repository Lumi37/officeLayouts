import { officesList } from "../index.js";

export function constructOfficeList(list){
    officesList.innerHTML= ''
    list.forEach( office => {
        officesList.innerHTML+= `<li data-office ="${office}">${office}</li>`
        
    });
    document.querySelector('.listedOffices').click()
}