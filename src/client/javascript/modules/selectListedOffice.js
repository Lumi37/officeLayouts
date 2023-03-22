export function selectListedOffice(target,chosenOfficeListItem){
    if(chosenOfficeListItem) chosenOfficeListItem.classList.remove('chosenOfficeListItem')
    chosenOfficeListItem = target
    chosenOfficeListItem.classList.add('chosenOfficeListItem')
    return chosenOfficeListItem
}