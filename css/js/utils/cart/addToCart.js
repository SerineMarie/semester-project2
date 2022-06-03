import { saveToStorage } from "../storage.js";
import { addedToCart } from "./addedToCart.js";

export function addToCart(event){
    this.classList.toggle("not-added");
    this.classList.toggle("added");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const img = this.dataset.img;

    const currentInCart = addedToCart();

    const productExist = currentInCart.find(function(prod){
        return prod.id === id;
    });

    if(!productExist){
        const productOne = {id: id, title: title, price: price, img: img};
        currentInCart.push(productOne);
        location.href = "cart.html";
        saveToStorage(currentInCart);
    } 
    else
    {
       const newProd = currentInCart.filter(fav => fav.id !== id);
       saveToStorage(newProd);
    }
};