import { api } from "./api";

export async function GetFriends() {
    const x = await api("users")
    console.log(x);
    return x;
}