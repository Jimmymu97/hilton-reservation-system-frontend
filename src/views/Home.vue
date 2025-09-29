<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Hilton Restaurant</h1>
        <p class="hero-subtitle">Excellent dining experience</p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="main-section">
      <div class="container">
        <div class="content-grid">
          <!-- Booking Form -->
          <div class="booking-section">
            <h2 class="section-title">Online booking</h2>
            <p class="section-subtitle">Book your table and enjoy the excellent dining experience at Hilton Restaurant</p>
            <BookingForm @booking-created="handleBookingCreated" />
          </div>

          <!-- Features -->
          <div class="features-section">
            <h2 class="section-title">Why choose Hilton Restaurant?</h2>
            
            <div class="features-grid">
              <el-card class="feature-card">
                <div class="feature-icon">
                  <i class="el-icon-star-on"></i>
                </div>
                <h3>Fine Dining</h3>
                <p>Award winning cuisine prepared by our professional chef team</p>
              </el-card>

              <el-card class="feature-card">
                <div class="feature-icon">
                  <i class="el-icon-user-solid"></i>
                </div>
                <h3>Group Activity</h3>
                <p>The perfect venue for celebrations and business gatherings</p>
              </el-card>

              <el-card class="feature-card">
                <div class="feature-icon">
                  <i class="el-icon-time"></i>
                </div>
                <h3>Convenient Booking</h3>
                <p>A simple and easy-to-use online booking system</p>
              </el-card>

              <el-card class="feature-card">
                <div class="feature-icon">
                  <i class="el-icon-service"></i>
                </div>
                <h3>Quality Service</h3>
                <p>Excellent service experience in an elegant environment</p>
              </el-card>
            </div>

            <!-- Contact Info -->
            <el-card class="contact-card">
              <div slot="header">
                <span>Contact Information</span>
              </div>
              <div class="contact-info">
                <p><strong>Address:</strong> 123 Hilton Street, City, State 12345</p>
                <p><strong>Phone:</strong> (555) 123-4567</p>
                <p><strong>Business Hours:</strong> Monday to Sunday 11:00 AM -10:00 PM</p>
                <router-link to="/staff/login" class="staff-link">
                  <i class="el-icon-s-custom"></i> Staff Login
                </router-link>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BookingForm from '@/components/booking/BookingForm.vue'

export default {
  name: 'Home',
  components: {
    BookingForm
  },
  methods: {
    handleBookingCreated() {
      this.$message.success('Booking request submitted successfully! We will confirm as soon as possible.')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #1a3a6c 0%, #2c5282 100%);
  color: white;
  padding: 100px 0 80px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
}

.main-section {
  padding: 80px 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.section-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a3a6c;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.feature-card {
  text-align: center;
  padding: 20px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.feature-icon {
  font-size: 3rem;
  color: #1a3a6c;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.contact-card {
  margin-top: 30px;
}

.contact-info p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.staff-link {
  display: inline-flex;
  align-items: center;
  color: #1a3a6c;
  text-decoration: none;
  font-weight: 500;
  margin-top: 15px;
  
  &:hover {
    color: #2c5282;
  }
  
  i {
    margin-right: 5px;
  }
}

@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
}
</style>