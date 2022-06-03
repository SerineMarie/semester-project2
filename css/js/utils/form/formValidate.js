export function checkLen (value, len){
    if(value.trim().length > len){
        return true;
    } else{
        return false;
    };
};

export function emailValid(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
};