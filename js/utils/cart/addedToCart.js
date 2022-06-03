export function addedToCart(){
    const itemsInCart = localStorage.getItem("products");

    if(!itemsInCart){
        return [];
    } else {
        return JSON.parse(itemsInCart);
    };
};