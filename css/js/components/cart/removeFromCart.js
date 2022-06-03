import { saveToStorage } from "../../utils/storage.js";
import { addedToCart } from "../../utils/cart/addedToCart.js";

export function removeFromCart(event){
    this.classList.toggle("notInCart");
    this.classList.toggle("inCart");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const img = this.dataset.img;

    const alreadyExist = addedToCart();

    const productInCart = alreadyExist.find(function(item){
        return item.id === id;
    });

    if(!productInCart){
        const cartItem = {id: id, title: title, price: price, img: img};
        alreadyExist.push(cartItem);
        saveToStorage(alreadyExist);
    } else
    {
       const newCart = alreadyExist.filter(fav => fav.id !== id);
       window.location.reload();
       saveToStorage(newCart);
    };
};