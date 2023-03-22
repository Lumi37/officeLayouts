import _ from 'lodash'
 
export function getOfficesList(requestedFloors, allOffices){
    let officesList = []
    if(requestedFloors[0].isChecked) return allOffices
    for(let i=1; i<requestedFloors.length; i++){
        console.log(requestedFloors[i].isChecked)
        if(requestedFloors[i].isChecked)
            if(requestedFloors[i].checkbox === 'Isogeio'){
                console.log('isogeio')
                let tempArr = allOffices.filter(office=>office.startsWith('I') || office.startsWith('m') || office.startsWith('d'))
                officesList = _.concat(officesList,tempArr)
            }
            else if(requestedFloors[i].checkbox === 'ProtosOrofos'){
                console.log('ProtosOrofos')
                let tempArr = allOffices.filter(office=>office.startsWith('A'))
                officesList = _.concat(officesList,tempArr)
            }
            else if(requestedFloors[i].checkbox === 'DeuterosOrofos'){
                console.log('DeuterosOrofos')
                let tempArr = allOffices.filter(office=>office.startsWith('B'))
                officesList = _.concat(officesList,tempArr)
            }
    }
    return officesList
}