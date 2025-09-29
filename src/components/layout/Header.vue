<template>
  <el-header class="app-header">
    <div class="header-content">
      <div class="logo" @click="$router.push('/')">
        <i class="el-icon-food"></i>
        <span class="logo-text">Hilton Restaurant</span>
      </div>
      
      <div class="header-actions">
        <template v-if="$store.getters['auth/isAuthenticated']">
          <el-tag type="info" class="user-info">
            {{ $store.getters['auth/currentUser'].username }} ({{ $store.getters['auth/currentUser'].role }})
          </el-tag>
          <el-button 
            type="text" 
            icon="el-icon-switch-button" 
            @click="handleLogout"
          >
            EXIT
          </el-button>
        </template>
        
        <template v-else>
          <el-button 
            v-if="$route.path.startsWith('/staff')"
            type="text" 
            icon="el-icon-user" 
            @click="$router.push('/staff/login')"
          >
            Staff Login
          </el-button>
          <el-button 
            v-else
            type="text" 
            @click="$router.push('/staff/login')"
          >
            Staff Entrance
          </el-button>
        </template>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    handleLogout() {
      this.$confirm('Are you sure you want to log out?', 'Prompt', {
        confirmButtonText: 'CONFIRM',
        cancelButtonText: 'CANCEL',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('auth/logout')
        this.$router.push('/')
        this.$message.success('Logged out')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background: linear-gradient(135deg, #1a3a6c 0%, #2c5282 100%);
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  
  .el-icon-food {
    font-size: 24px;
    margin-right: 10px;
  }
  
  .logo-text {
    font-size: 20px;
    font-weight: bold;
  }
  
  &:hover {
    opacity: 0.8;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
</style>