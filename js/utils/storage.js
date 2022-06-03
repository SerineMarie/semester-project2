const tokenKey = "token";
const userKey = "user";

export function saveToStorage(itemsInCart){
    localStorage.setItem("products", JSON.stringify(itemsInCart));
};

export function clearStorage(){
    localStorage.clear();
};

export function saveToken(token){
    saveTokenToStorage(tokenKey, token)
};

export function getToken(){
   return getLoginFromStorage(tokenKey)
};

export function saveUser(user){
    saveTokenToStorage(userKey, user);
};

export function getUsername(){
    const user = getLoginFromStorage(userKey)

    if(user){
        return user.username;
    }
    return null;
};

function saveTokenToStorage (key, value){
    localStorage.setItem(key, JSON.stringify(value))
};

function getLoginFromStorage (key){
    const value = localStorage.getItem(key)
    if(!value){
        return [];
    }

    return JSON.parse(value);
};