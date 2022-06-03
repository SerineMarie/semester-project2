import menu from "../../components/common/menu.js";
import footer from "../../components/common/footer.js";
import {logOut} from "../form/logOut.js";
import displayMessage from "../../components/displayMessage.js";
import {baseUrl} from "../../constants/api.js";
import { getToken } from "../storage.js";

menu();
footer();
logOut();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const messageContainer = document.querySelector(".displayMessage");
const featured = document.querySelector("#checkbox");

form.addEventListener("submit", publishProduct);

function publishProduct(event){
    event.preventDefault();
    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = parseFloat(price.value);
    const imageValue = image.value;
    const featuredValue = featured.checked;
    
    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageValue.length === 0 ) {
        return displayMessage("Warning", "Please enter the correct values", ".displayMessage");
    }
    addProduct(titleValue, descriptionValue, priceValue, featuredValue);
}
async function addProduct(title, description, price, image, featured){
    const url = baseUrl + "/products";
    const data = JSON.stringify({title: title, description: description, price: price, image: image, featured: featured});
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

    };
};