export const baseUrl = 'https://duolago.cn';
export const imgStatus = {
    headImg: 0,
    dishImg: 1,
    storeHeadImg: 2,
    cateringLicense: 3,
    storeBusinessImg: 4,
};

export const permissionStatus = {
    superadmin: 0,
    admin: 1,
    user: 2,
}

export const swapTime = (str) => {
    let date = str ? new Date(parseInt(str)) : new Date();
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';

    let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    let strDate = Y + M + D + h + m + s;
    return strDate;
}