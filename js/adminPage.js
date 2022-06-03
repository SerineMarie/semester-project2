import menu from "./components/common/menu.js";
import footer from "./components/common/footer.js";
import {logOut} from "./utils/form/logOut.js";
import displayMessage from "./components/displayMessage.js";
import { checkLen } from "./utils/form/formValidate.js";
import {baseUrl} from "./constants/api.js";
import { getToken } from "./utils/storage.js";

menu();
footer();
logOut();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const messageContainer = document.querySelector(".displayMessage");
form.addEventListener("submit", publishProduct);

function publishProduct(event){
    event.preventDefault();
    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = parseFloat(price.value);
    
    // if(checkLen(titleValue, 0) === true || checkLen(descriptionValue, 0) === true || checkLen(priceValue, 0) === true || isNaN(priceValue)){
    //     displayMessage("Warning", "Please complete the form before publishing", ".displayMessage")
    // }
    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("Warning", "Please enter the correct values", ".displayMessage");
    }
    addProduct(titleValue, descriptionValue, priceValue);
}

async function addProduct(title, description, price){
    const url = baseUrl + "/products";
    const data = JSON.stringify({title: title, description: description, price: price});
    const token = getToken()
    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
        },
    };
    try {
        const respons = await fetch(url, options);
        const json = await respons.json();
        if(json.created_at){
            displayMessage("Success", "Product published!", ".displayMessage");
            form.reset();
        }
        if(json.error){
            displayMessage("Error", json.message, ".displayMessage");
        }
        console.log(json)
    }catch(error){
        console.log(error)
        displayMessage("Error", "An error occured", ".displayMessage");

    }
};