export const transformWhereQuery = (
  whereQueryObject: any,
  schemaAlias: boolean,
) => {
  // if(schemaAlias){

  // }
  const stringQueryArr = Object.keys(whereQueryObject);
  const paramQueryArr = Object.values(whereQueryObject);
  let stringQuery = '';
  const paramQuery = {};
  for (let i = 0; i < stringQueryArr.length; i++) {
    if (i !== 0) stringQuery += ' AND ';
    stringQuery += `${stringQueryArr[i]} = :${stringQueryArr[i]}`;
    paramQuery[`${stringQueryArr[i]}`] = paramQueryArr[i];
  }
  console.log('transform Where', { stringQuery, paramQuery });
  return { stringQuery, paramQuery };
};
