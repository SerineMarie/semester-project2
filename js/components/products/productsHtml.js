import { productsUrl, baseUrl } from "../../constants/api.js";
import { searchProducts } from "../../utils/products/searchProducts.js";
import { getUsername } from "../../utils/storage.js";
const productsContainer = document.querySelector(".products");

export async function productsHtml(){
    productsContainer.innerHTML = "";
    const username = getUsername();

        try {
        const response = await fetch(productsUrl);
        const result = await response.json();
        console.log(result)
        for(let i = 0; i < result.length; i++){
            const productImages = baseUrl + result[i].image.formats.small.url;
            const productImagesThumbnail = baseUrl + result[i].image.formats.thumbnail.url;

            let cardContent = `<div class="card">
                                    <div class="card_top-img" style="background-image: url('${productImages}');"></div>
                                    <div class="card_top-img-thumbnail" style="background-image: url('${productImagesThumbnail}');"></div>
                                    <div class="card_body">
                                        <h1 class="card_body-title">${result[i].title}</h1>
                                        <p class="card_body-text">Price: $${result[i].price}</p> 
                                    </div>
                                </div>`

            let editProducts = `<a href="product.html?id=${result[i].id}">
                                    ${cardContent}
                                </a>`;
            if(username){
                editProducts = `<a href="editProduct.html?id=${result[i].id}">
			                        <div class="admin-edit"><i class="fas fa-edit"></i></div>
                                    ${cardContent}
                                </a>`
            } 
            productsContainer.innerHTML += `${editProducts}`;
        };
        searchProducts(result);        
    } catch(error){
        console.log(error)
        // displayMessage("Error", "Ops, I'm sorry, something went wrong!", ".displayMessage")
    };
};