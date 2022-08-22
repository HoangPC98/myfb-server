const containerUl = (li_array) => ` <ul class="list-user">${li_array}</ul>`;

export const renderListUser = (dataUser) => {
    let li_array = ''
    dataUser.forEach(userItem => {
        li_array += ` <li class="list-user-item flex-row" id="li_user_uid:${userItem.id}">
                            <div class="profile-part_ left-section flex-row">
                                <img class="profile-part p_avatar container-right__connect-item-avatar" src="${userItem.avatar_url}">
                                <div class="profile-part p_username container-right__connect-item-name alg-center">${userItem.given_name}</div>
                            </div>
                            <button type="button" class="add-fr-btn btn btn-primary">Thêm bạn bè</button>
                        </li>`
    })
    return containerUl(li_array)
}