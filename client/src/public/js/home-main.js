import { decodeAccessToken, getCookieByName } from '/js/common.js'
import { getRequest } from '/js/fetch-api.js';
import { renderNewFeed } from '/render-component/list-post.render.js'

window.onload = () => {
    loadUserInfo()
    loadNewsfeed(false);
}

const accessToken = getCookieByName('access_token');
const decodeToken = decodeAccessToken(accessToken)

const loadUserInfo = () => {
    $('#header-avatar').attr('src', decodeToken.avatar_url)
    $('#avatar-postnew').attr('src', decodeToken.avatar_url)
    $('#header-me-dropdown').attr('src', decodeToken.avatar_url)
    $('#header-username').html(decodeToken.last_name)
}

const loadNewsfeed = async(loadMore) => {
    let page_number = 1
    if (loadMore) page_number = localStorage.getItem('current_page_number')
    const getNewsfeed = await getRequest(`posts/newsfeed`, { page_number: page_number })
    console.log('getNewfeed..', getNewsfeed.data)
    $('.post-list').html(renderNewFeed(getNewsfeed.data))
    $('.newsfeed__comment-img').attr('src', decodeToken.avatar_url)
}

