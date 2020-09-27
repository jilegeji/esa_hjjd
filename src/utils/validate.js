/**
 * 判断是否为空
 * @param val
 * @returns {boolean}
 */
export const validatenull = (val) => {
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}

/**
 * 校验手机号格式
 * @param str
 * @returns {boolean}
 */
export const validatePhone = (str) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}
