import menu from "./components/common/menu.js";
import footer from "./components/common/footer.js";
import { addedToCart } from "./utils/cart/addedToCart.js";
import displayMessage from "./components/displayMessage.js";
import { removeFromCart } from "./components/cart/removeFromCart.js";

menu();
footer();

const products = addedToCart();
const cartContainer = document.querySelector(".cart");
if(products.length === 0){
    displayMessage("Warning", "You have no items in your cart", ".displayMessage" )
}
products.forEach(product => {
    cartContainer.innerHTML += `<div class="card card_cart">
                                    <div class="card_cart-img" style="background-image: url('${product.img}');"></div>
                                    <div class="card_body">
                                        <h2 class="card_body-title">${product.title}</h2>
                                        <p class="card_body-text price">Price: $${product.price}</p>
                                        <p class="card_body-text"><a href="product.html?id=${product.id}">View product</a></p>
                                    </div>
                                    <button class="card_cart-btn deleteBtn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.img}"> <i class="fas fa-trash-alt"></i></button>
                                </div>`
    const cartButton = document.querySelector(".card button");
    function cartDeleteBtn (){
        cartButton.addEventListener("click", removeFromCart);
     };
     cartDeleteBtn();

 
     function addTotal(){
         const totalPrice = document.querySelector(".total_price");
         const sumProducts = addedToCart();
         let totalCart = 0;

         sumProducts.forEach((product) => {
             const price = product.price;
             totalCart += Number.parseInt(price)
         });
         const subtotal = totalCart;
         totalPrice.innerHTML += `<p>Your total: $${subtotal}</p>`;
         console.log(subtotal)
     };
     addTotal();
});