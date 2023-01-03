const serverUrl = 'http://localhost:5000'
const commonHeader = {
    "Content-Type": "application/json",
}

const convertParams = (params, type) => {
    const keyParams = Object.keys(params)
    const valueParams = Object.values(params)
    console.log(keyParams, valueParams)
    let stringParams = ''
    for (let i = 0; i < keyParams.length; ++i) {
        if(type === 'q'){
            stringParams += `${keyParams[i]}=${valueParams[i]}` + (i < length-1 ? '&' : '')
        }
        else if(type === 'p') {
            stringParams += '/' + valueParams[i]
        }
    }   
    console.log('paramsss', stringParams)
        return stringParams
}

export const getCookieByName = function(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

const atokenCookie = getCookieByName('access_token');
if(atokenCookie)
    var bearer_token = 'Bearer ' + atokenCookie

export const httpPost = async(endpoint, payload, isIncludeFile, headers) => {
    const uri = `${serverUrl}/${endpoint}`
    const options = {
        method: "POST",
    }
    
    if (isIncludeFile) {
        options.body = payload
    } else {
        options.headers = {
            Authorization: bearer_token,
            "Content-Type": "application/json",
        }
        options.body = JSON.stringify(payload)
    }

    return await fetch(uri, options).then(response => response.json()).then(data => { return data }).catch(err => { console.log(err) });
}

export const httpGet = async(endpoint, params) => {
    const stringParams = convertParams(params, 'q')
    const uri = `${serverUrl}/${endpoint}?${stringParams}`
    console.log('>>>URI', uri)
    const options = {
        method: 'GET',
        headers: {
            Authorization: bearer_token,
            "Content-Type": "application/json",
        },
    }
    return await fetch(uri, options).then(response => response.json()).then(data => { return data }).catch(err => { console.log(err) });
}

export const httpUpdate = async(endpoint, params) => {
    const stringParams = convertParams(params, 'p')
    const uri = `${serverUrl}/${endpoint}?${stringParams}`
    console.log('>>>URI', uri)

    const options = {
        method: 'PUT',
        headers: {
            Authorization: bearer_token,
            "Content-Type": "application/json",
        },
    }
    return await fetch(uri, options).then(response => response.json()).then(data => { return data }).catch(err => { console.log(err) });
}

export const apis = {
    addFriend: 'friendship/request/new',
    cancelFriendRequest: 'friendship/request/cancel'
}


