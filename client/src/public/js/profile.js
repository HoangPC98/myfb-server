import { httpPost, httpGet,httpUpdate, apis, getCookieByName } from '/js/fetch-api.js';

window.onload = async () => {
    const apiUrl = window.sessionStorage.getItem('httpGet')
    const apiResponse = await httpGet(apiUrl)
    console.log('>>>proflle',apiResponse)
}