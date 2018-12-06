/**
 * 对象扩展
 * @param source [object] 需要复制的对象
 * @param deep [boolean] 是否进行深复制
 */
export function extendObject(source, deep) {
  function isPlainObject(obj) {
    return typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype
  }

  let isArray = Array.isArray || function (object) {
    return object instanceof Array
  }
  let target = {}
  if (isArray(source)) {
    target = []
  }
  for (let key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      target[key] = extendObject(source[key], deep)
    } else if (source[key] !== undefined) {
      if (isArray(source)) {
        target.push(source[key])
      } else {
        target[key] = source[key]
      }
    }
  }
  // 返回新对象
  return target
}
