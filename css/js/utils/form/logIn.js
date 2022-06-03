import menu from "../../components/common/menu.js";
import footer from "../../components/common/footer.js";
import { checkLen, emailValid } from "./formValidate.js";
import displayMessage from "../../components/displayMessage.js";
import { baseUrl } from "../../constants/api.js";
import { saveToken, saveUser } from "../storage.js";
menu();
footer();

const form = document.querySelector("form");
const displayMessageContainer = document.querySelectorAll(".displayMessage");
const username = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", logIn);
function logIn(event){
    event.preventDefault();
    displayMessageContainer.innerHTML += "";
    const emailValue = username.value.trim();
    const passwordValue = password.value.trim();
    if(emailValid(emailValue) != true){
        displayMessage("Error", "Invalid email address", ".displayMessage-email")
    } 
    if(checkLen(passwordValue, 7) != true){
        displayMessage("Error", "Invalid password", ".displayMessage-password")
    } 
    doLogIn(emailValue, passwordValue)
};

async function doLogIn(username, password){
    const url = baseUrl + "/auth/local";
    const data = JSON.stringify({identifier: username, password: password});
    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        },
    };
    try{
        const response = await fetch (url, options)
        const json = await response.json();
        console.log(json);

        if (json.user) {
            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "adminPage.html";
        };
    } catch(error){
        displayMessage("Error", "Ops, I'm sorry, something went wrong!", ".displayMessage")
    };
};