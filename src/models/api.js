const API_ROUTE = process.env.API_ROUTE || "http://localhost:3000/";

export const Globals = {
    user: null
}

export function login() {
    Globals.user = {name: "Nick"}
}

export function api(url) {
    return fetch(API_ROUTE + url).then(x => x.json());
}