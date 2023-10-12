export function getStr(obj, key) {
  if (!obj[key]) {
    obj[key] = !localStorage.getItem(key)
      ? false
      : localStorage.getItem(key);
  }
  return obj[key];
}

export function getObj(obj, key) {
  if (!obj[key]) {
    obj[key] = !localStorage.getItem(key)
      ? {}
      : JSON.parse(localStorage.getItem(key));
  }
  return obj[key];
}

export function getArray(obj, key) {
  if (!obj[key]) {
    obj[key] = !localStorage.getItem(key)
      ? []
      : JSON.parse(localStorage.getItem(key));
  }
  return obj[key];
}

export function getBoolen(obj, key) {
  if (!obj[key]) {
    obj[key] = !localStorage.getItem(key)
      ? false
      : JSON.parse(localStorage.getItem(key));
  }
  return obj[key];
}

export function setStr(obj, key, data) {
  obj[key] = data;
  localStorage.setItem(key, data)
}

export function setObj(obj, key, data) {
  obj[key] = data;
  console.log("setObj",JSON.stringify(data))
  localStorage.setItem(key, JSON.stringify(data))
}
