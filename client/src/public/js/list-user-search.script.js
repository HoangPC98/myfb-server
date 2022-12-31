import {
    renderListUser
} from '/render-component/list-user.render.js'
import { postRequest, getRequest, getCookieByName } from '/js/fetch-api.js';
import { decodeAccessToken } from '/js/common.js'

window.onload = async() => {
    const data_response = await redirectRequest()
    console.log('response', data_response)
    loadListUser(data_response)
}

const redirectRequest = async() => {
    let redirect_request = localStorage.getItem('redirect_request')
    redirect_request = JSON.parse(redirect_request)
    console.log('ok man', redirect_request)
    let response;
    if (redirect_request.method === 'GET')
        response = await getRequest(redirect_request.endpoint, redirect_request.param)
    else if (redirect_request.method === 'POST')
        response = await postRequest(redirect_request.endpoint, redirect_request.payload)
    return response
}

const loadListUser = (response) => {
    const renderLoad = renderListUser(response.data)
    console.log('render relaod', renderLoad)
    $('.body-list-user').html(renderLoad)
}

$('.body-list-user').on('click', async function(e) {
    console.log('etqarget', e.target)
    let this_user_id
    let decode_token = decodeAccessToken()

    if (e.target.classList.contains('add-fr-btn')) {
        let parent = e.target.parentElement
        this_user_id = parent.id
        console.log('UIDD', this_user_id)
        this_user_id = this_user_id.split(':')[1]
        console.log('thus_uid', this_user_id, parent)

        console.log('decode', decode_token)
        await postRequest(`friendship/new`, {
            sender_uid: decode_token.uid,
            receiver_uid: +this_user_id
        })

    } else if (e.target.classList.contains('profile-part')) {
        let parent = e.target.parentElement.parentElement
        this_user_id = parent.id
        this_user_id = this_user_id.split(':')[1]
        await getRequest(`users/profile`, {
            user_id: this_user_id
        })
    }
})