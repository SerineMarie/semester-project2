import { baseUrl } from "../../constants/api.js";
import { getToken } from "../../utils/storage.js";

export function deleteButton (id){
    const deleteContainer = document.querySelector(".delete_container");
    deleteContainer.innerHTML = `<button class="card_btn delete">Delete</button>`;

    const button = document.querySelector("button.delete");

    button.onclick = async function(){
        console.log(id)

        const doDelete = confirm("Ready to delete this item?");

        if(doDelete){
            const url = baseUrl + "/products/" + id;
            const token = getToken();
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }; 
            try {
                const respons = await fetch(url, options)
                const json = respons.json();
                location.href ="/products.html";
                console.log(json)
            }catch(error){
                displayMessage("Error", "Ops, I'm sorry, something went wrong!", ".displayMessage")
            };
        };
    };
};