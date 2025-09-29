<template>
  <div class="login-page">
    <div class="login-container">
      <el-card class="login-card">
        <div slot="header" class="login-header">
          <div class="logo">
            <i class="el-icon-food"></i>
            <span>Hilton Restaurant</span>
          </div>
          <h3>Staff Login</h3>
          <p>Restaurant reservation management system</p>
        </div>

        <el-form 
          ref="loginForm" 
          :model="form" 
          :rules="rules" 
          @submit.native.prevent="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="Enter one user name"
              prefix-icon="el-icon-user"
              size="large"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="Please enter the password"
              prefix-icon="el-icon-lock"
              size="large"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button 
              type="primary" 
              size="large" 
              :loading="loading" 
              class="login-button"
              native-type="submit"
            >
              {{ loading ? 'Logging in ....' : 'Login' }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
          <p>Default test account</p>
          <p><strong>Administrator:</strong> admin / admin123</p>
          <p><strong>Employee:</strong> staff / staff123</p>
          
          <el-button 
            type="text" 
            @click="$router.push('/')"
            class="back-home"
          >
            <i class="el-icon-back"></i> Return to Home
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffLogin',
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: 'Enter one user name', trigger: 'blur' },
          { min: 3, message: 'The username must be at least 3 characters long', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter the password', trigger: 'blur' },
          { min: 6, message: 'Password length must be at least 6 characters', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$router.push('/staff/dashboard')
    }
  },
  methods: {
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        
        this.loading = true
        
        await this.$store.dispatch('auth/login', this.form)
        
        this.$message.success('登录成功！')
        this.$router.push('/staff/dashboard')
        
      } catch (error) {
        if (error.response) {
          this.$message.error(error.response.data.message || 'Login failed')
        } else if (error.errors) {
          // 表单验证错误，不显示消息
        } else {
          this.$message.error('Login failed, please check network connection')
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a3a6c 0%, #2c5282 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.login-header {
  text-align: center;
  padding: 0 0 20px 0;
  
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    
    i {
      font-size: 24px;
      color: #1a3a6c;
      margin-right: 10px;
    }
    
    span {
      font-size: 18px;
      font-weight: bold;
      color: #1a3a6c;
    }
  }
  
  h3 {
    margin: 10px 0 5px 0;
    color: #333;
  }
  
  p {
    color: #666;
    margin: 0;
  }
}

.login-button {
  width: 100%;
  height: 45px;
  font-size: 16px;
  margin-top: 10px;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  
  p {
    margin: 5px 0;
    color: #666;
    font-size: 14px;
  }
  
  .back-home {
    margin-top: 10px;
    color: #1a3a6c;
    
    &:hover {
      color: #2c5282;
    }
  }
}

::v-deep .el-card__header {
  padding: 30px 20px 0;
}

::v-deep .el-card__body {
  padding: 20px;
}
</style>