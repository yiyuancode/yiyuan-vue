/**
 *  逆向递归匹配
 * @param treeData
 * @param id
 * @returns {*[]}单个id匹配包括本身在内的id数组
 */
export function doMatch(treeData, key) {
  let arr = [];
  let returnArr = [];
  let depth = 0;

  function childrenEach(childrenData, depthN) {
    for (let j = 0; j < childrenData.length; j++) {
      depth = depthN;
      arr[depthN] = childrenData[j].id;
      if (childrenData[j].id == key) {
        returnArr = arr.slice(0, depthN + 1);
        break;
      } else {
        if (childrenData[j].children) {
          depth++;
          childrenEach(childrenData[j].children, depth);
        }
      }
    }
    return returnArr;
  }

  return childrenEach(treeData, depth);
}

/**
 *  返回结果
 * @param treeData
 * @param ids
 * @returns {*[]}cascader组件需要的二维id数组
 */
export function getCascaderSelectedKeys(treeData, ids) {
  let result = [];
  let idArray = ids.split(',');
  for (let i = 0; i < idArray.length; i++) {
    result.push(doMatch(treeData, idArray[i]));
  }
  return result;
}

/**
 * level: 当前层级
 * data: 当前层级的数据
 */
export function setDisable(level, data) {
  data.forEach((v) => {
    //此处判断可根据你后台返回的数据类型适当变换，原理就是将不符合条件的项给禁掉
    if (!v.children && v.level.value < level) {
      v.disabled = true;
    }
    if (!v.children && v.level.value == level) {
      v.disabled = true;
    }
    if (v.children) {
      setDisable(level, v.children);
    }
  });
}
