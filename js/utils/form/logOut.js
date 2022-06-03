import {getUsername} from "../storage.js";
const username = getUsername();
export function logOut(event){
    const logOutBtn = document.querySelector(".footer_link-btn");
    logOutBtn.addEventListener("click", logUserOut);
 };

function logUserOut(){
    if(username){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        location.href ="/";
    };
};