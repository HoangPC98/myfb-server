import { decodeAccessToken, getCookieByName } from '/js/common.js'

window.onload = () => {
    loadUserInfo()
}

const loadUserInfo = () => {
    const accessToken = getCookieByName('access_token');
    const decodeToken = decodeAccessToken(accessToken)
    $('#header-avatar').attr('src', decodeToken.avatar_url)
    $('#avatar-postnew').attr('src', decodeToken.avatar_url)
    $('#header-me-dropdown').attr('src', decodeToken.avatar_url)
    $('#header-username').html(decodeToken.last_name)
}