import {baseUrl} from "../../constants/api.js"
import { addToCart } from "../../utils/cart/addToCart.js";
// import displayMessage from "../displayMessage.js";
const title = document.querySelector("title");

const productContainer = document.querySelector(".product")
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const oneProductUrl = "http://localhost:1337/products/" + id;

export async function oneProduct(){
    try{ 
        const rep = await fetch(oneProductUrl)
        const json = await rep.json();
        const productImg = baseUrl + json.image.formats.medium.url;
        const productImgSmall = baseUrl + json.image.formats.thumbnail.url;
        title.innerHTML = `${json.title}`;
        productContainer.innerHTML += `<div class="card_one">
                                            <div class="card_one_top-img" style="background-image: url('${productImg}');"></div>
                                            <div class="card_one_top-img-small" style="background-image: url('${productImgSmall}');"></div>
                                            <div class="card_body">
                                                <h1 class="card_body-title">${json.title}</h1>
                                                <p class="card_body-text">Price: $${json.price}</p>
                                                <p class="card_body-text">Product description:</p>
                                                <p>${json.description}</p>
                                                <button class="card_btn addToBtn not-added" data-id="${json.id}" data-title="${json.title}" data-price="${json.price}" data-img="${productImgSmall}"> Add to cart <i class="fas fa-shopping-bag"></i></button>
                                            </div>
                                        </div>`

        const cartButton = document.querySelector(".card_one button");
        function cartBtn (){
            cartButton.addEventListener("click", addToCart);
        };
        cartBtn();
    }catch(error){
        console.log(error)
        // displayMessage("Error", "Ops, I'm sorry, something went wrong!", ".displayMessage")
    }
}