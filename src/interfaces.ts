export interface ICustomError{
    message: string,
    statusCode: number
}

export interface IUser{
    id?: number,
    name: string,
    email: string,
    avatar_id?: string 
}

export interface IAvatar{
    id?: number,
    url: string
}

export interface IPost{
    id?:number,
    name: string,
    content: string,
    user_id?:number
}