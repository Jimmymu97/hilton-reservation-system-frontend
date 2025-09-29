<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <div class="container">
        <h1 class="page-title">Booking Management</h1>
        <p class="page-subtitle">Manage restaurant reservations and customer information</p>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="container">
        <el-card class="filters-card">
          <el-form :model="filters" inline>
            <el-form-item label="Select date">
              <el-date-picker
                v-model="filters.date"
                type="date"
                placeholder="Select date"
                value-format="yyyy-MM-dd"
                @change="handleFilterChange"
              />
            </el-form-item>
            
            <el-form-item label="Status filtering">
              <el-select 
                v-model="filters.status" 
                placeholder="Status filtering"
                @change="handleFilterChange"
              >
                <el-option label="All statuses" value="all" />
                <el-option label="Applied" value="requested" />
                <el-option label="Confirmed" value="confirmed" />
                <el-option label="Canceled" value="cancelled" />
                <el-option label="Completed" value="completed" />
              </el-select>
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                icon="el-icon-refresh" 
                @click="refreshBookings"
                :loading="loading"
              >
                Refresh
              </el-button>
            </el-form-item>
          </el-form>
          
          <div class="stats">
            <span class="stat-item">
              Total: <strong>{{ bookingsCount }}</strong> bookings
            </span>
            <span class="stat-item">
              Filter: <strong>{{ filteredBookings.length }}</strong> results
            </span>
          </div>
        </el-card>

        <el-card class="tabs-card">
          <el-tabs v-model="activeTab" @tab-click="handleTabChange">
            <el-tab-pane label="All Bookings" name="all">
              <BookingList 
                :bookings="currentBookings"
                :loading="loading"
                @status-change="handleStatusChange"
                @refresh="refreshBookings"
              />
            </el-tab-pane>
            
            <el-tab-pane label="Coming Soon" name="upcoming">
              <BookingList 
                :bookings="upcomingBookings"
                :loading="loading"
                @status-change="handleStatusChange"
                @refresh="refreshBookings"
              />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import BookingList from '@/components/booking/BookingList.vue'

export default {
  name: 'StaffDashboard',
  components: {
    BookingList
  },
  data() {
    return {
      loading: false,
      activeTab: 'all',
      filters: {
        date: null,
        status: 'all'
      }
    }
  },
  computed: {
    bookings() {
      return this.$store.getters['bookings/allBookings']
    },
    
    filteredBookings() {
      return this.$store.getters['bookings/filteredBookings']
    },
    
    upcomingBookings() {
      return this.$store.getters['bookings/upcomingBookings']
    },
    
    bookingsCount() {
      return this.$store.getters['bookings/bookingsCount']
    },
    
    currentBookings() {
      return this.activeTab === 'all' ? this.filteredBookings : this.upcomingBookings
    },
    
    currentUser() {
      return this.$store.getters['auth/currentUser']
    }
  },
  async mounted() {
    await this.loadBookings()
  },
  methods: {
    async loadBookings() {
      this.loading = true
      try {
        await this.$store.dispatch('bookings/fetchBookings')
      } catch (error) {
        this.$message.error('Failed to load booking data')
        console.error('Error loading bookings:', error)
      } finally {
        this.loading = false
      }
    },
    
    async refreshBookings() {
      await this.loadBookings()
      this.$message.success('Data refreshed')
    },
    
    handleFilterChange() {
      this.$store.dispatch('bookings/setFilters', this.filters)
    },
    
    handleTabChange(tab) {
      if (tab.name === 'upcoming') {
        this.filters.status = 'all'
        this.filters.date = null
        this.handleFilterChange()
      }
    },
    
    async handleStatusChange({ bookingId, newStatus }) {
      try {
        await this.$store.dispatch('bookings/updateBookingStatus', {
          bookingId,
          status: newStatus
        })
        this.$message.success('Booking status updated successfully')
      } catch (error) {
        this.$message.error('Update status failed')
        console.error('Error updating booking status:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.dashboard-header {
  background: white;
  padding: 30px 0;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 0;
}

.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a3a6c;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.dashboard-content {
  padding: 30px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.filters-card {
  margin-bottom: 20px;
  
  .el-form {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }
}

.stats {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
  
  .stat-item {
    margin-right: 20px;
    color: #666;
    
    strong {
      color: #1a3a6c;
    }
  }
}

.tabs-card {
  ::v-deep .el-card__body {
    padding: 0;
  }
  
  ::v-deep .el-tabs__header {
    margin: 0;
  }
  
  ::v-deep .el-tabs__content {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .filters-card .el-form {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>