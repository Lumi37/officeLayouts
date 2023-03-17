import { offices } from "../index.js";
export function displaySelectedOffice(target,selectedOffice){
    offices.forEach(office=>{
        office.classList.remove('chosenOffice')
        if(office.dataset.office === target.dataset.office){
            office.classList.add('chosenOffice')
            selectedOffice = office.dataset.office 
        }
    })
    console.log(selectedOffice)
    return selectedOffice
}

