import tweetContentEmoji from './tweetContentEmoji'
import accountName from './accountName'
import onlyPlay from './onlyPlay'
import swipe from './swipe'
import timelineRestrain from './timelineRestrain'
const directives = {
  tweetContentEmoji,
  accountName,
  onlyPlay,
  swipe,
  timelineRestrain,
}

export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
