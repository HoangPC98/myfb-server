const serverUrl = 'http://localhost:5000'
const commonHeader = {
    "Content-Type": "application/json",
}

const convertParams = (params) => {
    const keyParams = Object.keys(params)
    const valueParams = Object.values(params)
    console.log(keyParams, valueParams)
    let stringParams = '?'
    for (let i = 0; i < keyParams.length; ++i) {
        stringParams += `${keyParams[i]}=${valueParams[i]}`
        if (i < keyParams.length - 1) stringParams += '&'
    }
    return stringParams
}

export const postRequest = async(endpoint, payload, isIncludeFile) => {
    const uri = `${serverUrl}/${endpoint}`
    const authorization = 'Bearer ' + getCookieByName('access_token')
    const options = {
        method: "POST",
    }

    if (isIncludeFile) {
        options.headers = {
            Authorization: authorization,
        }
        options.body = payload
        console.log('is file', isIncludeFile)
    } else {
        options.headers = {
            Authorization: authorization,
            "Content-Type": "application/json",
        }
        options.body = JSON.stringify(payload)
    }

    console.log('data>>>>', options)
    return await fetch(uri, options)
}

export const getRequest = async(endpoint, params) => {
    const stringParams = params ? convertParams(params) : ''

    const uri = `${serverUrl}/${endpoint}${stringParams}`
    const authorization = 'Bearer ' + getCookieByName('access_token')
    const options = {
        method: 'GET',
        headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
        },
    }
    return fetch(uri, options).then(response => response.json()).then(data => { return data }).catch(err => { console.log(err) });
}



export const getCookieByName = function(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}