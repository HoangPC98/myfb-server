import { getParentOrigin, getItemId } from '/js/common.js';
import { postRequest, getRequest, getCookieByName } from '/js/fetch-api.js';


// $('.post-list').on('click', async function(e) {
//     const reaction_area = getParentOrigin(e.target, 'newsfeed__action-item')
//     console.log('Reaction AS', reaction_area)
//     if (reaction_area !== null) {

//         const postItemId = getItemId(e.target, 'item-post')
//         console.log('itemID...', parent.id);
//         const payload = {
//             "entity_id": +postItemId,
//             "react_option": "like",
//             "entity_type": "posts"
//         }
//         await postRequest('reaction/new', payload)
//     }
// })

function showReactBar(e) {
    const itemId = getItemId(e.target, 'item-post')
    console.log('itemdifja ID...', itemId)
}

$('.#react_bar').on('click', showReactBar(e))

// $('.reaction-a').mouseenter(showReactBar(e)).mouseleave(hideReactBar(e))

// .on({
//     mouseenter: function(e) {
//         const itemId = getItemId(e.target, 'item-post')
//         console.log('itemdifja ID...', itemId)
//             // $(`#react-bar_post:${itemId}`).load('/html/components/modal-react-icon.html')
//     }
// })