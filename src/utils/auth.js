/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 14:47:39
 * @LastEditors: harley
 * @LastEditTime: 2024-03-11 19:43:20
 */
import jsCookie from 'js-cookie'

const KEY = 'authorization'
export const getToken = () => {
  return jsCookie.get(KEY)
}
export const setToken = (token, expire) => {
  return jsCookie.set(KEY, token, { expires: expire })
}
export const removeToken = () => {
  return jsCookie.remove(KEY)
}
