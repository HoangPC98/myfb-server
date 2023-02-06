import { httpPost, httpGet,httpUpdate, apis, getCookieByName } from '/js/fetch-api.js';

window.onload = async () => {
    const fetchObj = JSON.parse(window.localStorage.getItem('get_search'))
    const searchResult = await httpGet(fetchObj.url, fetchObj.q)
    console.log('searchhh resulttttt',searchResult)
    // const uid = JSON.parse(getCookieByName('user'))['uid']
    // console.log('UIDDDDD...',uid)
    searchResult.data.forEach(item=>{
        var textFriendBtn = 'Add Friend'
        var styleFriendBtn = 'btn-primary'
        if(item.friendship_2u === 'pending'){
            textFriendBtn = 'Cancel Request'
            styleFriendBtn = 'btn-secondary'
        }
        else if(item.friendship_2u === 'follow'){
            textFriendBtn = 'Folowing'
            styleFriendBtn = 'btn-light'
        }
        else if(item.friendship_2u === 'friend'){
            textFriendBtn = 'Send Message'
            styleFriendBtn = 'btn-success'
        }
                   
        $('#search-items').append(`
        <div class="user-li">
            <div class="row d-flex justify-content-between">
            <div class="row d-flex">
                <img src="${item.user_avatar_url}" alt="user" class="profile-photo-lg">
                <div class="d-flex flex-column justify-content-between">
                <h5><a href="profile/${item.user_id}" class="profile-link">${item.user_name}</a></h5>
                <p>${item.num_friend} friends (${item.mutual_friend.length} mutual friend)</p>
                </div>
            </div>
            
            <div class="col-md-2 col-sm-2">
                <button id="addfr-uid_${item.user_id}" class="btn  ${styleFriendBtn} pull-right add-fr-btn">${textFriendBtn}</button>
            </div>
            </div>
        </div>
        `)
    })

    $('.profile-link').click(function(e) {
        window.sessionStorage.setItem('httpGet' , `/users/profile?user_id=${e.target.href.split('/profile/')[1]}`)
    })
    
    $('.add-fr-btn').click(async function (e) {
        var receiver_uid = +this.id.split('_')[1]
        if($(this).text() === 'Add Friend'){
            try {
                await httpPost(apis.addFriend, { receiver_uid })  
                $(this).text('Cancel Request')
                $(this).removeClass('btn-primary')
                $(this).addClass('btn-light')
            } catch (error) {
                alert('Error: ' + error)
            }
        }
        else{
            try {
                await httpUpdate(apis.cancelFriendRequest, {receiver_uid})
                $(this).text('Add Friend')
                $(this).removeClass('btn-light')
                $(this).addClass('btn-primary')
            } catch (error) {
                alert('Error: ' + error)
            }
        }
    })
}