export const timelineRestrain = {
  async mounted(el, binding) {
    const isImg = el.tagName === 'IMG';
    if (!isImg) return;
    // 图片是否是竖直方向
    const isVertical = binding.value.width < binding.value.height;
    // 如果图片是竖图，则设置高度最大为400px，宽度根据高度等比例缩放
    if (isVertical) {
      el.parentElement.style.maxHeight = '400px';
      el.parentElement.style.maxWidth = '400px';
      el.parentElement.style['border-radius'] = '4px';
      return;
    }
    // 正常图片，宽度
    const width = el.offsetWidth;
    const originWidth = binding.value.width;
    const originHeight = binding.value.height;
    el.style.height = `${originHeight * (width / originWidth)}px`;
    el.style.width = '100%';
    return;
  },
}