import { inject, computed } from 'vue'

export default function useLogo() {
  const isDark = inject('isDark', false);
  const logo = computed(() => {
    return isDark.value ? '/images/logo-dark.png' : '/images/logo.png';
  });
  return {
    logo,
  };
}
