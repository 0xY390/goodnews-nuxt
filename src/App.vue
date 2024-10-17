<script setup>
import LoginModal from '@/components/LoginModal/index.vue'
import ChangePasswordModal from '@/components/ChangePasswordModal/index.vue'
const router = useRouter()
const route = useRoute()
const isDark = ref(false)
provide('isDark', isDark)
onMounted(async () => {
  // 深色模式
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkMode = darkThemeMq.matches
  if (prefersDarkMode) {
    document.body.setAttribute('arco-theme', 'dark')
    isDark.value = true
  }
  darkThemeMq.addListener(e => {
    if (e.matches) {
      document.body.setAttribute('arco-theme', 'dark')
      isDark.value = true
    } else {
      document.body.removeAttribute('arco-theme')
      isDark.value = false
    }
  })
  await nextTick()

  const script = document.createElement('script')
  script.src = '/lib/rive/rive@2.16.0.js'
  document.body.appendChild(script)
  // 开发环境添加vconsole
  if (process.env.NODE_ENV === 'development') {
    const script = document.createElement('script')
    script.src = '//unpkg.com/vconsole@latest/dist/vconsole.min.js'
    document.head.appendChild(script)
  }

  window.dispatchEvent(new Event('nuxt:loading-finish'))
})
</script>

<template>
  <LoginModal></LoginModal>
  <ChangePasswordModal></ChangePasswordModal>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
