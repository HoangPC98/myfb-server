import { LIKED_SVG, LIKE_SVG, HAHA_SVG, LOVE_SVG, SAD_SVG, WOW_SVG, ANGRY_SVG } from '/img/reaction-svg/svg-link.js'

const containerUl = (li_post) => ` <ul class="list-post newfeed">${li_post}</ul>`;
const publicURI = 'http://localhost:5000'

export const renderNewFeed = (dataPosts) => {
    let html = '';
    let reaction_text;
    let reaction_img;
    dataPosts.forEach((postItem) => {
        reaction_img = 'https://w7.pngwing.com/pngs/176/981/png-transparent-basic-like-template-ui-basic-ui-set-v-outline-icon-thumbnail.png'
        reaction_text = 'Like'
        switch (postItem.seft_reaction) {

            case 'like':
                reaction_img = LIKED_SVG;
                reaction_text = 'Like'
                break;
            case 'love':
                reaction_img = LOVE_SVG;
                reaction_text = 'Love'
                break;
            case 'haha':
                reaction_img = HAHA_SVG;
                reaction_text = 'haha'
                break;
            case 'sad':
                reaction_img = SAD_SVG;
                reaction_text = 'Sad'
                break;
            case 'wow':
                reaction_img = WOW_SVG;
                reaction_text = 'Wow'
                break;
            case 'angry':
                reaction_img = ANGRY_SVG;
                reaction_text = 'Angry'
                break;
        }
        console.log('any thing', reaction_img)
        html += ` <div class="newsfeed item-post" id="itempost_${postItem.post_id}">
        <div class="newsfeed__info">
            <div class="newsfeed__info-profile">
                <img class="newsfeed__-profile-avt" src="${postItem.owner_avatar}">
                <div class="newsfeed__info-profile-more">
                    <div class="newfeed_postId"></div>

                    <span class="newsfeed__info-name">
                        ${postItem.owner_name}
                    </span>
                    <div class="newsfeed__info-time">
                        ${postItem.created_at}
                        <i class="fas fa-globe-europe"></i>
                    </div>
                </div>
            </div>
            <div class="newsfeed__info-setting more-dots">
                <i class="fas fa-ellipsis-h"></i>
                <ul class="newsfeed__info-setting-list">
                    <li class="newsfeed__info-setting-item">
                        <div class="newsfeed__info-setting-item__img">
                            <i class="fas fa-cloud-download"></i>
                        </div>
                        <div class="newsfeed__info-setting-item__content">
                            <p class="newsfeed__info-setting-item__text">
                                Lưu bài viết
                            </p>
                            <p class="newsfeed__info-setting-item__title">
                                Thêm danh sách vào mục đã lưu.
                            </p>
                        </div>
                    </li>
                    <div>
                        <li class="newsfeed__info-setting-item">
                            <div class="newsfeed__info-setting-item__img">
                                <i class="fas fa-link"></i>
                            </div>
                            <div class="newsfeed__info-setting-item__content">
                                <p class="newsfeed__info-setting-item__text">
                                    Nhúng
                                </p>
                            </div>
                        </li>
                        <li class="newsfeed__info-setting-item">
                            <div class="newsfeed__info-setting-item__img">
                                <i class="far fa-bell"></i>
                            </div>
                            <div class="newsfeed__info-setting-item__content">
                                <p class="newsfeed__info-setting-item__text">
                                    Bật thông báo về bài viết.
                                </p>
                            </div>
                        </li>
                        <li style="display: flex" class="newsfeed__info-setting-item edit-post">
                            <div class="newsfeed__info-setting-item__img">
                                <i class="fas fa-history"></i>
                            </div>
                            <div class="newsfeed__info-setting-item__content">
                                <p class="newsfeed__info-setting-item__text">
                                    Chỉnh sửa bài viết
                                </p>
                            </div>
                        </li>
                        <li style="display: flex" class="newsfeed__info-setting-item delete-post">
                            <div class="newsfeed__info-setting-item__img">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                            <div class="newsfeed__info-setting-item__content">
                                <p class="newsfeed__info-setting-item__text">
                                    Chuyển vào thùng rác
                                </p>
                                <p class="newsfeed__info-setting-item__title">
                                    Các mục trong thùng rác sẽ bị xoá sau 30 ngày.
                                </p>
                            </div>
                        </li>
                    </div>
                    <li class="newsfeed__info-setting-item">
                        <div class="newsfeed__info-setting-item__img">
                            <i class="fas fa-ban"></i>
                        </div>
                        <div class="newsfeed__info-setting-item__content">
                            <p class="newsfeed__info-setting-item__text">
                                Ẩn bài viết
                            </p>
                            <p class="newsfeed__info-setting-item__title">
                                Ẩn bớt các bài viết tương tự
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="newsfeed__content">
            <p class="newsfeed__content-text">${postItem.text}</p>
            <img style="display: block" src="${publicURI}/${postItem.list_photo[0]}" alt="" class="newsfeed__content-img">
        </div>

        <div class="newsfeed__respond">
            <div title="" style="display: flex" class="newsfeed__respond-react">
                <div class="newsfeed__respond-react-icon">
                    <i class="fas fa-thumbs-up"></i>
                </div>
                <span class="newsfeed__respond-like-total mg-left6" style="font-size: 14px">
                ${postItem.count_reaction}
                </span>
            </div>
            <div style="display: flex" class="newsfeed__respond-right">
                <span class="newsfeed__respond-comment-total">${postItem.count_reaction}</span>
                <span> bình luận </span>
            </div>
        </div>

        <ul data-index="" class="newsfeed__action">
            <div class="react-bar" id="react-bar_post:${postItem.post_id}"></div>
            <li class="newsfeed__action-item reaction-a" id="reaction-a-pid_${postItem.post_id}">
                <img class="newsfeed__-profile-avt reaction-icon" src="${reaction_img}">
                <span class="newsfeed__action-item-text">${reaction_text}</span>
            </li>
            <li class="newsfeed__action-item comment-action">
                <i class="far fa-comment-alt newsfeed__action-item-icon"></i>
                <span class="newsfeed__action-item-text">Bình luận</span>
            </li>
            <li class="newsfeed__action-item">
                <i class="fas fa-share newsfeed__action-item-icon"></i>
                <span class="newsfeed__action-item-text">Chia sẻ</span>
            </li>
        </ul>

        <div class="newsfeed__comment">
            <div class="newsfeed__comment-user">
                <img src="" alt="" class="nav-wall newsfeed__comment-img avt">
                <div class="newsfeed__comment-box">
                    <input type="text" placeholder="Viết bình luận ..." class="newsfeed__comment-input">
                    <div class="newsfeed__comment-box-right">
                        <div class="newsfeed__comment-box-icon test">
                            <i class="far fa-laugh-beam"></i>
                        </div>
                        <div class="newsfeed__comment-box-icon">
                            <i class="fas fa-camera"></i>
                        </div>
                        <div class="newsfeed__comment-box-icon send-comment" style="display: none">
                            <i class="fas fa-paper-plane"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="newsfeed__commented-box">
                <div class="commented-switch">
                    <div class="show-hide-cmt commented-switch__text">
                        Tất cả bình luận
                    </div>
                    <div class="commented-switch__text">
                        Phù hợp nhất
                        <i class="fad fa-caret-down"></i>
                    </div>
                </div>
                <div class="commented-box">

                </div>
            </div>
        </div>
    </div>`
    })
    return containerUl(html)
}