import { productsUrl, baseUrl, heroBannerUrl } from "../../constants/api.js";
// import displayMessage from "../displayMessage.js";
const featureContainer = document.querySelector(".feature_container");
const bannerContainer = document.querySelector(".banner_container");

export async function heroBanner(){
    try{
        const rep = await fetch(heroBannerUrl);
        const data = await rep.json();
        const heroBannerImg = "http://localhost:1337" + data.hero_banner.formats.large.url;
        const heroBannerResponsive = "http://localhost:1337" + data.hero_banner.url;

        bannerContainer.innerHTML += `<div class="banner_container-img" style="background-image: url('${heroBannerImg}');"></div>
                                        <div class="banner_container-responsive-img"><img src="${heroBannerResponsive}"/></div>`
    } catch(error){
        console.log(error)
        // displayMessage("Error", "Ops, I'm sorry, something went wrong!", ".displayMessage");
    }
}

export async function indexHtml(){
    try {
        const response = await fetch(productsUrl);
        const result = await response.json();

        for(let i = 0; i < result.length; i++){
            const productImages = baseUrl + result[i].image.formats.thumbnail.url;
            const productImage= baseUrl + result[i].image.url;

            if(result[i].featured === true){
                featureContainer.innerHTML += `<a href="product.html?id=${result[i].id}">
                                                    <div class="card_featured">
                                                        <div class="card_body">
                                                            <h1 class="card_title">${result[i].title}</h1>
                                                            <p class="card_body_text">Price: $${result[i].price}</p>
                                                        </div>
                                                        <img class="card_featured-img" src="${productImages}"/>
                                                        <img class="card_featured-img-responsive" src="${productImage}"/>
                                                    </div>
                                                </a>`
            }
        }
    } catch(error){
        console.log(error)
        // displayMessage("Error", "Ops, I'm sorry, something went wrong!", ".displayMessage");
    }
}



