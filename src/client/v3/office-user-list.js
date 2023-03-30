/** @type {HTMLElement} */
let host
let selected
export function initUserList(hostElement){
    host = hostElement
    document.addEventListener('office-selection',async e=>{
        const selection = e.detail
        const officeData = await fetch(`/getofficeinformation/?office=${selection}`).then(o=>o.json())
        constructList(officeData)
    
        host.querySelectorAll('li').forEach(li=>{
            li.addEventListener('click',e=>{
                const userData = e.target.closest('li').dataset
                if(selected)selected.classList.remove('selected')
                e.target.closest('li').classList.add('selected')
                selected = e.target.closest('li')
                const userSelectionEvent = new CustomEvent('user-selection', { 
                    detail:{
                        user:userData.user,
                        outlet:userData.outlet,
                        position:userData.position
                    }, 
                    bubbles: true })
                host.dispatchEvent(userSelectionEvent)
            })
        })
        document.addEventListener('initiated-search',()=>{
            host.querySelector('.user-list').innerHTML = ''
        })
        document.addEventListener('canceled-search',()=>{
            console.log('canceled-search')
            constructList(officeData)
        })

        document.addEventListener('user-updated',e=>{
            updateList(e.detail)
        })
    })


    document.addEventListener('resolved-search',e=>{
        constructList(e.detail)
        document.querySelectorAll('li').forEach(li=>{
            li.addEventListener('click',e=>{
                const userData = e.target.closest('li').dataset
                const userSelectionEvent = new CustomEvent('user-selection', { 
                    detail:{
                        user:userData.user,
                        outlet:userData.outlet,
                        position:userData.position
                    }, 
                    bubbles: true })
                const userSelectedBySearchEvent = new CustomEvent('user-selection-by-search',{detail:userData.office, bubbles:true})
                host.dispatchEvent(userSelectedBySearchEvent)
                host.dispatchEvent(userSelectionEvent)
                
            })
        })
    })
}
//FUNCTIONS 

function constructList(data){
    host.querySelector('.user-list').innerHTML = /*html*/`
    <ul>
        ${data.map(user=>` <li data-user="${user.user}" data-office="${user.office}" data-outlet="${user.outlet}" data-position="${user.position}" class="userListItem">User:&nbsp; 
          <span>${user.user}</span>
          &nbsp; Outlet:&nbsp; 
          <span>${user.outlet}</span>
        </li>`).join('\n')}
    </ul>
        `
}


function updateList(updatedData){
    console.log(updatedData)
    host.querySelectorAll('li').forEach(li=>{
        if(updatedData.position === li.dataset.position){
            li.dataset.user = updatedData.user
            li.dataset.outlet = updatedData.outlet
            li.innerHTML = `User:&nbsp; 
            <span>${user.user}</span>
            &nbsp; Outlet:&nbsp; 
            <span>${user.outlet}</span>`
        }
    })
}