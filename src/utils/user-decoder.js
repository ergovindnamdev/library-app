import { jwtDecode } from "jwt-decode";

export function userDetails() {
    return (localStorage.getItem('loginToken')) ? jwtDecode(localStorage.getItem('loginToken')) : "";
}