<template>
  <el-footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>Hilton Restaurant</h4>
        <p>Excellent dining experience, online booking system</p>
      </div>
      
      <div class="footer-section">
        <h4>Contact Information</h4>
        <p>Address: 123 Hilton Street, City, State 12345</p>
        <p>Phone: (555) 123-4567</p>
        <p>Business hours: Monday to Sunday 11:00 AM -10:00 PM</p>
      </div>
      
      <div class="footer-section">
        <h4>Quick Links</h4>
        <p><router-link to="/">Home Page</router-link></p>
        <p><router-link to="/staff/login">Staff Login</router-link></p>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 Hilton Restaurant. All rights reserved.</p>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section {
  h4 {
    margin-bottom: 15px;
    color: #3498db;
  }
  
  p {
    margin-bottom: 8px;
    line-height: 1.6;
  }
  
  a {
    color: #ecf0f1;
    text-decoration: none;
    
    &:hover {
      color: #3498db;
    }
  }
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding: 20px;
  text-align: center;
  background-color: #1a252f;
}
</style>