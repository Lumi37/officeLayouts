let storedUsers

export async function initIdapUsers(users){

    const allUsers =  await fetch('https://api.lan.eoppep.gr/ldap/users').then(r=>r.json())
    storedUsers = allUsers.map(user =>{
        let toBeStored = []
        for (let i=0; i<users.length; i++){
            if(user.sAMAccountName === users[i].user){
                console.log(user.sAMAccountName === users[i].user,'--->',user.sAMAccountName,' and ',users[i].user)
                toBeStored.push(user)
            }
        }
        return toBeStored
    })
    console.log(storedUsers.length)

}

// export function find(){
//     console.log()
// }