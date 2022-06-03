import { productsHtml } from "../../components/products/productsHtml.js";
const productsContainer = document.querySelector(".products");

export function searchProducts(result){
    const searchInput = document.querySelector(".search_bar-input");
    searchInput.onkeyup = function(event){
        const searchValue = event.target.value.trim();
        const searchedProducts = result.filter(function(product){
            if(product.title.toLowerCase().startsWith(searchValue)){
                return productsHtml(searchedProducts);
            }
            else {
                return productsContainer.innerHTML = "No products matches your search";
            }
        });
    };
};