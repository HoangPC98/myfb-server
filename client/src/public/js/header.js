import { httpPost, httpGet, getCookieByName } from '/js/fetch-api.js';

$('#search-input').keypress(async function(e){
    if(e.keyCode === 13){
        var thisInputVal = $('#search-input').val();
       
        let key = thisInputVal.replaceAll(' ', '_')
        window.localStorage.setItem('get_search', JSON.stringify({url: '/users/search', q: {key}}))
        window.location.href = '/search-result'
    }
})
// $('#search-input').on('keydown', async function(e) {
//     console.log('keyyyy: ', e.key)
//     if (e.key == 'Enter') {
//         console.log('Enter value', this.value)
//         console.log('EnterKey', this.value)
//         let inputValue = this.value
//             // inputValue = inputValue.toLowerCase().split(' ').join('-')
//         console.log('SEARCHHH', inputValue)
//         const params = {
//             inputname: inputValue
//         }
//         const listUser = await httpGet('users/search', params)
//         console.log('this User', listUser)
//     }
// })