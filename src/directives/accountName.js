export const accountName = {
  beforeMount(el, binding) {
    const emojiList = binding?.value?.emoji || []
    emojiList.forEach((item) => {
      const text = `:${item.shortcode}:`
      const reg = new RegExp(text, 'g')
      el.innerHTML = el.innerHTML.replace(reg, `<img src="${item.image_url}" style="width:20px;height:20px;display: inline-block" />`)
    });
  },
}