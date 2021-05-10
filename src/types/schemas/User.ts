interface User {
    id? : number,
    uuid? : string,
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    created? : Date
}

export {
    User
}