import menu from "../../components/common/menu.js"
import footer from "../../components/common/footer.js"
import { baseUrl } from "../../constants/api.js";
import { getToken } from "../storage.js";
import displayMessage from "../../components/displayMessage.js";
import { deleteButton } from "../../components/products/deleteButton.js";
menu();
footer();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
if(!id){
    document.location.href = "/";
}
const productUrl = baseUrl + "/products/" + id;
const form = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const image = document.querySelector("#image");
const idInput = document.querySelector("#id")
const messageContainer = document.querySelector(".displayMessage");

(async function (){
    try {
        const response = await fetch(productUrl);
        const details = await response.json();
        title.value = details.title;
        description.value = details.description;
        price.value = details.price;
        // image.value = details.image;
        idInput.value = details.id;
        deleteButton(details.id);

    }catch(error){
        console.log(error)
        displayMessage("Error", "Ops, I'm sorry, something went wrong!", ".displayMessage")
    }finally {
        form.style.display = "flex";
    }
})();

form.addEventListener("submit", editProduct);

function editProduct(event){
    event.preventDefault()
    messageContainer.innerHTML = "";

    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();
    const priceValue = parseFloat(price.value);
    const imageValue = image.value;
    const idValue = idInput.value;
    
    if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0 || imageValue.length === 0) {
        return displayMessage("Warning", "Please enter the correct values", ".displayMessage");
    }
    updateProduct(titleValue, descriptionValue, priceValue, imageValue, idValue);
};
async function updateProduct(title, description, price, image, id) {
    const url = baseUrl + "/products/" + id;
    const data = JSON.stringify({title: title, description: description, price: price, image: image});
    const token = getToken()
    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
        },
    };
    try{
        const response = await fetch(url, options)
        const json = await response.json();
        if(json.published_at){
            displayMessage("Success", "Product updated", ".displayMessage");
        } 
        if(json.error){
            displayMessage("Error", json.message, ".displayMessage")
        }
    }catch(error){
        displayMessage("Error", "Ops, I'm sorry, something went wrong!", ".displayMessage")
    }
};