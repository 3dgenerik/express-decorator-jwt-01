import { Request } from "express";

export interface ICustomError {
    message: string;
    statusCode: number;
}

export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    avatars_id?: number;
}

export interface IUserJWT {
    user: {
        id: number;
        name: string;
        email: string;
        hash: string;
        avatars_id?: number;
    };
}

export interface IAvatar {
    id?: number;
    url: string;
}

export interface IPost {
    id?: number;
    title: string;
    content: string;
    user_id: number;
}

export interface IProfile {
    id?: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    user_id: number;
}

export interface IUserPosts{
    title: string,
    content: string,
    users_id: number
}