import { postRequest, getRequest, getCookieByName } from '/js/fetch-api.js';


document.querySelector('.header-main').onclick = function() {
    console.log('fjsinofsifsd')
}
console.log('sdafsdfa')
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
        const listUser = await getRequest('users/search', params)
        console.log('this User', listUser)
    }
})