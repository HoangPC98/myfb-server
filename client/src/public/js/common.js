export const getCookieByName = function(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

export const decodeAccessToken = () => {
    const token = getCookieByName('access_token');
    // const decodedToken = jwt_decode(accessToken)
    // console.log('decoded token: ', decodedToken)
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log('json payload: ', JSON.parse(jsonPayload))
    return JSON.parse(jsonPayload);
    // return decodedToken
}