const vnmListChar = [
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
const searchResourceUnicode = (keyword: string, arr: any[], searchBy: string) => {
  const listFilter = arr.filter((item) => {
      if (isVietnameseChar(keyword)) {
          if (
              item[searchBy]
                  .toLowerCase()
                  .includes(keyword.toLocaleLowerCase())
          )
              return item;
      } else {
          const newString = convertToAccent(keyword);
          const newUserName = convertToAccent(item[searchBy]);
          if (newUserName.includes(newString)) return item;
      }
  });
  return listFilter;
};

const convertToAccent = (inputStr: string) => {
  let newStr = inputStr.normalize('NFD');
  //remove accent
  newStr = newStr.replace(/[\u0300-\u036f]/g, '');
  //convert đ to d
  newStr = newStr.replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D'));

  newStr = newStr.toLocaleLowerCase();

  return newStr;
};

const isVietnameseChar = (inputStr: string) => {
  for (let i = 0; i < inputStr.length; i++) {
      if (vnmListChar.includes(inputStr.charAt(i))) {
          return true;
      }
  }
};

export { searchResourceUnicode }
