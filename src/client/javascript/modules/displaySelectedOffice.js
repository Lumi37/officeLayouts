import { offices } from "../index.js";
export function displaySelectedOffice(target,selectedOffice){
    offices.forEach(office=>{
        office.classList.remove('chosenOffice')
        if(office.dataset.office === target.innerHTML){
            office.classList.add('chosenOffice')
            selectedOffice = office.dataset.office 
        }
    })
    return selectedOffice
}