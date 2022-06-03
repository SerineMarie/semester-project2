import { getUsername } from "../../utils/storage.js"; 

export default function footer(){
    const footerContainer = document.querySelector(".footer_container");
    const username = getUsername();
    let logOut = `<a href="logIn.html">Log In</a>`

    if(username){
        logOut = `<button class="footer_link-btn">Log Out</button>`;
    }
    footerContainer.innerHTML = `<div class="footer_item">
                                    ${logOut}
                                </div>
                                <div class="footer_item">
                                    <p class="footer_item-p">Copyright 2021</p>
                                </div>`
};