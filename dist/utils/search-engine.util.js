"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByUserNameUnicode = exports.vnmListChar = void 0;
exports.vnmListChar = [
    'à',
    'á',
    'ả',
    'ạ',
    'ã',
    'ắ',
    'ằ',
    'ẵ',
    'ẳ',
    'ặ',
    'â',
    'ấ',
    'ầ',
    'ẩ',
    'ẫ',
    'ậ',
    'è',
    'é',
    'ẻ',
    'ẽ',
    'ẹ',
    'ê',
    'ề',
    'ế',
    'ể',
    'ễ',
    'ệ',
    'ì',
    'í',
    'ĩ',
    'ỉ',
    'ị',
    'ò',
    'ó',
    'ỏ',
    'õ',
    'ọ',
    'ô',
    'ồ',
    'ố',
    'ổ',
    'ỗ',
    'ộ',
    'ơ',
    'ờ',
    'ớ',
    'ở',
    'ỡ',
    'ợ',
    'ù',
    'ú',
    'ủ',
    'ũ',
    'ụ',
    'ư',
    'ừ',
    'ứ',
    'ữ',
    'ử ',
    'ự',
    'ỳ',
    'ý',
    'ỹ',
    'ỷ',
    'ỵ',
    'đ',
];
const searchByUserNameUnicode = (inputStr, listUser) => {
    console.log(listUser);
    const listFilter = listUser.filter((userItem) => {
        if (isVietnameseChar(inputStr)) {
            if (userItem['given_name']
                .toLowerCase()
                .includes(inputStr.toLocaleLowerCase()))
                return userItem;
        }
        else {
            const newinputStr = convertToAccent(inputStr);
            const newUserName = convertToAccent(userItem['given_name']);
            if (newUserName.includes(newinputStr))
                return userItem;
        }
    });
    return listFilter;
};
exports.searchByUserNameUnicode = searchByUserNameUnicode;
const convertToAccent = (inputStr) => {
    let newStr = inputStr.normalize('NFD');
    newStr = newStr.replace(/[\u0300-\u036f]/g, '');
    newStr = newStr.replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'));
    newStr = newStr.toLocaleLowerCase();
    return newStr;
};
const isVietnameseChar = (inputStr) => {
    for (let i = 0; i < inputStr.length; i++) {
        if (exports.vnmListChar.includes(inputStr.charAt(i))) {
            return true;
        }
    }
};
//# sourceMappingURL=search-engine.util.js.map