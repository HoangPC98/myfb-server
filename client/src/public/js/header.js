import { redirectRequest } from '/js/common.js';
import {
    postRequest,
    getRequest,
    getCookieByName
} from '/js/fetch-api.js';


$('#search-input').on('keydown', async function(e) {
    console.log('keyyyy: ', e.key)
    if (e.key == 'Enter') {
        console.log('Enter value', this.value)
        console.log('EnterKey', this.value)
        let inputValue = this.value
            // inputValue = inputValue.toLowerCase().split(' ').join('-')
        console.log('SEARCHHH', inputValue)
        const params = {
            inputname: inputValue
        }
        const requestObj = {
            method: 'GET',
            endpoint: 'users/search',
            param: params
        }
        localStorage.setItem('redirect_request', JSON.stringify(requestObj))
        location.href = '/list-user-search'

    }
})



$('#logout-btn').on('click', async() => {
    console.log('LOGOUTTT')
    const logOutResult = await getRequest('auth/logout')
    if (logOutResult.statusCode !== 200) alert(`logout failure: ${logOutResult.message}`)
    else location.href = '/'
})