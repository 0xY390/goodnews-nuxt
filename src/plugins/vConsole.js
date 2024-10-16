/*
 * @Author: harley
 * @Date: 2024-03-06 17:04:48
 * @LastEditors: harley
 * @Description: 
 */
import VConsole from 'vconsole'
export const initVConsole = (app) => {
  if (process.env.NODE_ENV === 'development') {
    const vConsole = new VConsole()
    app.use(vConsole)
  }
}
