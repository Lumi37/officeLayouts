
let storedUsers;

export async function initIdapUsers(users) {
    const allUsers = await fetch("https://api.lan.eoppep.gr/ldap/users").then((r) => r.json());
    storedUsers =[
        ...allUsers
            .map((user) => {
                let toBeStored = [];
                for (let i = 0; i < users.length; i++) {
                    if (user.sAMAccountName === users[i].user) toBeStored.push(user);
                }
                return toBeStored;
            })
            .filter((user) => {
                if (user.length >= 1) {
                    return user;
                }
            })
            .flat()
    ];
}

export async function appendInfoFromIdap(officeUsers){
    officeUsers = JSON.parse(officeUsers)
    officeUsers.forEach(u => {
        for(let i=0; i<storedUsers.length; i++){
            if(u.user === storedUsers[i].sAMAccountName){
                u.displayName = storedUsers[i].displayName
                u.cn = storedUsers[i].cn
            }              
        }
    });
    return JSON.stringify(officeUsers)
}
