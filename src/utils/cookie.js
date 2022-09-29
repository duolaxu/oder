import Cookies from "js-cookie";
export const setCookie = (key, value, expireTime, path) => {
    Cookies.set(key, value, {
        expires: expireTime,
        path: path,
    });
}

export const getCookie = (key) => {
    return Cookies.get(key);
}

export const removeCookie = key => {
    return Cookies.remove(key);
}

export const removeAllCookie = () => {
    let cookie = document.cookie.split(";");
    cookie.map(item => {
        removeCookie(item.split("=")[0].replace(" ", ""));
    })
}