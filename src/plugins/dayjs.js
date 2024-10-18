import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 替换为你需要的语言
import relativeTime from 'dayjs/plugin/relativeTime' // 相对时间处理插件
// 时区
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
const dayjsPlugin = {
  install(app) {
    let userTimeZone = 'Asia/Shanghai' // 默认时区
    if (window.Intl) {
      // 获取用户的时区
      userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      console.log('用户时区:', userTimeZone)
    } else {
      console.warn('浏览器不支持Intl对象-获取用户时区')
    }
    dayjs.extend(utc)
    dayjs.extend(timezone)
    dayjs.extend(relativeTime) // 使用相对时间插件

    // 设置默认时区为纽约
    // userTimeZone = 'America/Toronto'
    dayjs.tz.setDefault(userTimeZone) // 设置用户时区
    dayjs.locale('zh-cn') // 替换为你需要的语言

    app.config.globalProperties.$dayjsFromNow = (date) => {
      return dayjs(date).tz(userTimeZone).fromNow()
    }
    app.config.globalProperties.$dayjs = dayjs
    app.provide('dayjs', dayjs)
  }
}

export default dayjsPlugin
