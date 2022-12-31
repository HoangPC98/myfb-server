import {
    postRequest,
    getRequest,
    getCookieByName
} from '/js/fetch-api.js';

document.querySelector('#close-post-box').onclick = () => {
    document.querySelector('.overlay.post-new').style.display = 'none';
}
document.querySelector('.post-box__content-textarea').oninput = function(e) {
        if (e.target.value != '') {
            document.querySelector('.post-box__btn').classList.add('btn-active');
        } else {
            document.querySelector('.post-box__btn').classList.remove('btn-active')
        }
    }
    // Upload FIle
document.querySelector('.post-box__add-icon.uploadfile').onclick = () => {
    document.querySelector('.input-upload').click()
}
var fileInput;
document.querySelector('.input-upload').addEventListener('change', e => {
    if (e.target.files.length > 0) {
        let src = URL.createObjectURL(e.target.files[0])
        document.querySelector('.img-preview').src = src
        document.querySelector('.img-preview').style.display = 'block'
        document.querySelector('#cancel-upload-img').style.display = 'flex'
    }
    fileInput = e.target.files

})
console.log('fileInput', fileInput)

$('#submit-post').click(async(e) => {
    console.log('this file inpit', fileInput)
    const payload = {
        text: $('#post-content').val(),
    }
    if (fileInput) payload.file = fileInput[0]
    $('.overlay.post-new').hide()
    await upload(payload)
})

document.querySelector('#cancel-upload-img').onclick = function() {
    console.log('asdlsfnvd.adsfgd')
    document.querySelector('.input-upload').value = ''
    document.querySelector('.img-preview').style.display = 'none'
    this.style.display = 'none'
}


const upload = async(payload) => {


    let isIncludeFile, data
    if (payload.file !== undefined) {
        data = new FormData()

        console.log('file load', payload.file)
        data.append('file', payload.file)
        data.append('text', payload.text)
        isIncludeFile = true
    } else {
        data = {
            text: payload.text
        }
    }

    console.log('fom datatata', data)
    const resonse = await postRequest('posts/new-post', data, isIncludeFile)
    if (resonse.status === 201) alert('Upload successfully')
    else alert('Failed to upload')
    window.location.reload()
};