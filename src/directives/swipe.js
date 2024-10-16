export const swipe = {
  async mounted(el, binding) {
    await nextTick();
    let scrollY = 0;
    let startRecord = false;
    const handleSrcoll = (e) => {
      if (!startRecord) return;
      // 获取当前滚动行为是上滑还是下滑
      if (e.target.documentElement.scrollTop <= 0) return;
      // 如果即将到达底部，则不触发
      const maxScroll = e.target.documentElement.scrollHeight - e.target.documentElement.clientHeight;
      if (e.target.documentElement.scrollTop >= maxScroll - 150) return;
      const direction = e.target.documentElement.scrollTop - scrollY > 0 ? 'down' : 'up';
      binding.value(direction);
      // 记录滚动条高度
      scrollY = e.target.documentElement.scrollTop;
    };
    const handleTouchStart = (e) => {
      startRecord = true;
    };

    const handleTouchEnd = (e) => {
      startRecord = false;
    };

    document.addEventListener('pointerdown', handleTouchStart);
    document.addEventListener('pointerup', handleTouchEnd);
    document.addEventListener('scroll', handleSrcoll);
    // 在卸载的时候移除事件监听
    document._handleTouchStart = handleTouchStart;
    document._handleTouchEnd = handleTouchEnd;
    document._handleScroll = handleSrcoll;
  },
  unmounted(el) {
    document.removeEventListener('pointerdown', document._handleTouchStart);
    document.removeEventListener('pointerup', document._handleTouchEnd);
    document.removeEventListener('scroll', document._handleScroll);
  },
}