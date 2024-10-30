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
    console.log(`output->按照依赖`, app)
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
