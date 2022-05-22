import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.github.com/',
});

export const API = {
    getUser(userName: string) {
        return instance.get<UserResponseType>(`users/${userName}`)
            .then(res => res.data)
    },
    getRepos(userName: string) {
        return instance.get<RepoResponseType[]>(`users/${userName}/repos`, {params: {per_page: 100}})
            .then(res => res.data)
    }
}

export type UserResponseType = {
    login: string
    avatar_url: string
    html_url: string
    name: string | null
    public_repos: number
    followers: number
    following: number
}

export type RepoResponseType = {
    id: number
    name: string
    html_url: string
    description: string | null
}