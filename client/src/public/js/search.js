import { httpPost, httpGet, apis, getCookieByName } from '/js/fetch-api.js';

window.onload = async () => {
    const fetchObj = JSON.parse(window.localStorage.getItem('get_search'))
    const searchResult = await httpGet(fetchObj.url, fetchObj.q)
    const uid = JSON.parse(getCookieByName('user'))['uid']
    console.log('UIDDDDD...',uid)
    searchResult.data.forEach(item=>{
        let beFriend = item.friends.includes(uid) ? true : false;
        $('#search-items').append(`
        <div class="user-li">
            <div class="row d-flex justify-content-between">
            <div class="row d-flex">
                <img src="${item.avatar_url}" alt="user" class="profile-photo-lg">
                <div class="d-flex flex-column justify-content-between">
                <h5><a href="#" class="profile-link">${item.given_name}</a></h5>
                <p>${item.friends.length} mutual friend</p>
                </div>
            </div>
            
            <div class="col-md-2 col-sm-2">
                <button id="addfr-uid_${item.id}" class="btn  ${beFriend? 'btn-light' : 'btn-primary'} pull-right add-fr-btn">${beFriend ? 'Friended': 'Add Friend'}</button>
            </div>
            </div>
        </div>
        `)
    })
    $('.add-fr-btn').click(async function (e) {
        var receiver_uid = +this.id.split('_')[1]
        console.log('this...',this)
        if($(this.text() === 'Add Friend')){
            try {
                await httpGet(apis.addFriend, { receiver_uid })  
                $(this).text('Cancel Request')
            } catch (error) {
                alert('Error: ' + error)
            }
        }
        else{
            try {
                await httpPut(apis.cancelFriendRequest, {receiver_uid})
            } catch (error) {
                alert('Error: ' + error)
            }
        }
    })
}