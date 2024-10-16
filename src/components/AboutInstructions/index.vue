<template>
  <div class="link-footer">
    <p>
      <strong>good.news</strong>:
      <a href="/about"
        ><span>{{ $t('layout.about') }}</span></a
      >
    </p>
    <p>
      <strong>Mastodon-PHP</strong>:
      <a href="/about" target="_blank"
        ><span>{{ $t('layout.about') }}</span></a
      >
      <!-- <a href="https://joinmastodon.org/apps" target="_blank"><span>获取应用程序</span></a> -->
      v0.0.1-beta
    </p>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.link-footer {
  margin-top: 1rem;
  line-height: 1.5;
  /*
  不用定位
  position: absolute;
  bottom: 20px;
  */
  font-size: 14px;
  color: var(--el-text-color-primary);
  p {
    a {
      color: var(--el-text-color-secondary);
      text-decoration: none;
      &[href] {
        text-decoration: underline;
        color: var(--el-text-color-primary);
      }
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
