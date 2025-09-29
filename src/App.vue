<template>
  <div id="app">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import '@/styles/global.scss'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  created() {
    // 初始化 API 服务
    this.$store.dispatch('auth/initializeAuth')
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 64px; /* Header height */
}

.el-loading-mask {
  z-index: 9999 !important;
}
</style>