import { getUsername } from "../../utils/storage.js"; 
export default function menu(){
    const {pathname} = document.location;
    const menuContainer = document.querySelector(".menu_container");
    const navContainer = document.querySelector(".nav_container");
    const username = getUsername();
    let authLink = `<p></p>`;
    let adminPage = `<p></p>`;
    if(username){
        adminPage = `<a href="adminPage.html" class="${pathname === "/adminPage.html" ? "active" : ""}">Admin Page</a>`;
        authLink = `<span class="userWelcome">Welcome ${username}!</span>`;
    } 
    menuContainer.innerHTML = `<div class="menu">
                                    <a href="/" class="${pathname === "/index.html" ? "active" : ""}">Home</a>
                                    <a href="products.html" class="${pathname === "/products.html" ? "active" : ""}">Products</a>
                                    <a href="cart.html" class="${pathname === "/cart.html" ? "active" : ""}"><i class="fas fa-shopping-bag"></i></a>
                                    ${adminPage}
                                </div>`;

    navContainer.innerHTML += `${authLink}`;
};