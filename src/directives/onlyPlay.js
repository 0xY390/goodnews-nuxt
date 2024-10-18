export const onlyPlay = {
  beforeMount(el) {
    el.cb = () => {
      const videos = document.querySelectorAll('video[data-playing="true"]');

      for (const video of videos) {
        if (video !== el) {
          video.pause();
        }
      }
      el.setAttribute('data-playing', 'true');
    };

    el.cb2 = () => {
      el.removeAttribute('data-playing');
    };
    el.addEventListener('play', el.cb);

    el.addEventListener('pause', el.cb2);
  },
  unmounted(el) {
    // 暂停
    el.pause();
    el.removeEventListener('play', el.cb);
    el.removeEventListener('pause', el.cb2);
  },
} 