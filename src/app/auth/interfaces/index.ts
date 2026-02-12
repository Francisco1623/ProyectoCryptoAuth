export interface User {
    id:string,
    email:string,
    nombre:string,
    alias:string,
    role:string
}

export interface LoginResponse{
    token:string,
    user:User
}

export interface TokenVerifyResponse{
    valid:boolean,
    user:JWTPayload
}

export interface JWTPayload{
    id:string,
    nombre:string,
    email:string,
    alias:string,
    role:string,
    iat:number,
    exp:number
}
 
