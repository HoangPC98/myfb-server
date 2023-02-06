export const getMutual2List = (list1: any[], list2: any[]) =>{
    var mutualList = [];
    for(let item1 of list1){
      if(list2.includes(item1)){
        mutualList.push(item1);
      }
    }
    return mutualList;
}