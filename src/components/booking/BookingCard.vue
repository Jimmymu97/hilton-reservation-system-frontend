<template>
  <el-card class="booking-card" :body-style="{ padding: '20px' }">
    <div class="booking-header">
      <div class="guest-info">
        <h3 class="guest-name">{{ booking.guestName }}</h3>
        <el-tag 
          :type="statusType" 
          size="small"
          class="status-tag"
        >
          {{ statusText }}
        </el-tag>
      </div>
      
      <el-dropdown @command="handleCommand" trigger="click">
        <el-button type="text" icon="el-icon-more"></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item 
            v-for="action in availableActions" 
            :key="action.command"
            :command="action.command"
            :icon="action.icon"
          >
            {{ action.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="booking-details">
      <div class="detail-item">
        <i class="el-icon-user"></i>
        <span>{{ booking.partySize }} {{ booking.partySize === 1 ? 'person' : 'people' }}</span>
      </div>
      
      <div class="detail-item">
        <i class="el-icon-time"></i>
        <span>{{ formatDateTime(booking.arrivalTime) }}</span>
      </div>
      
      <div class="detail-item">
        <i class="el-icon-phone"></i>
        <span>{{ booking.phone }}</span>
      </div>
      
      <div class="detail-item">
        <i class="el-icon-message"></i>
        <span class="email">{{ booking.email }}</span>
      </div>
    </div>

    <div v-if="booking.specialRequests" class="special-requests">
      <p><strong>Special Requests:</strong> {{ booking.specialRequests }}</p>
    </div>

    <div class="booking-footer">
      <span class="create-time">
        Created: {{ formatDateTime(booking.createdAt) }}
      </span>
    </div>
  </el-card>
</template>

<script>
import { formatDateTime } from '@/utils/dateUtil'

export default {
  name: 'BookingCard',
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  computed: {
    statusType() {
      const types = {
        requested: 'warning',
        confirmed: 'success',
        cancelled: 'danger',
        completed: 'info'
      }
      return types[this.booking.status] || 'info'
    },
    
    statusText() {
      const texts = {
        requested: 'Requested',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled',
        completed: 'Completed'
      }
      return texts[this.booking.status] || this.booking.status
    },
    
    availableActions() {
      const baseActions = []
      
      if (this.booking.status === 'requested') {
        baseActions.push(
          { command: 'confirm', label: 'Confirm Booking', icon: 'el-icon-check' },
          { command: 'cancel', label: 'Cancel Booking', icon: 'el-icon-close' }
        )
      }
      
      if (this.booking.status === 'confirmed') {
        baseActions.push(
          { command: 'complete', label: 'Mark as Completed', icon: 'el-icon-finished' },
          { command: 'cancel', label: 'Cancel Booking', icon: 'el-icon-close' }
        )
      }
      
      if (this.booking.status === 'completed' || this.booking.status === 'cancelled') {
        baseActions.push(
          { command: 'reopen', label: 'Reopen', icon: 'el-icon-refresh' }
        )
      }
      
      return baseActions
    }
  },
  methods: {
    formatDateTime,
    
    async handleCommand(command) {
      try {
        this.$emit('status-change', {
          bookingId: this.booking.id || this.booking._id,
          newStatus: this.getStatusFromCommand(command)
        })
        
        this.$emit('refresh')
        
      } catch (error) {
        console.error('Error handling command:', error)
      }
    },
    
    getStatusFromCommand(command) {
      const statusMap = {
        confirm: 'confirmed',
        cancel: 'cancelled',
        complete: 'completed',
        reopen: 'requested'
      }
      return statusMap[command]
    }
  }
}
</script>

<style lang="scss" scoped>
.booking-card {
  transition: all 0.3s ease;
  border: 1px solid #e6e6e6;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.guest-info {
  flex: 1;
  
  .guest-name {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
    color: #333;
    line-height: 1.3;
  }
}

.status-tag {
  font-weight: 500;
}

.booking-details {
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #666;
  font-size: 0.9rem;
  
  i {
    margin-right: 8px;
    width: 16px;
    text-align: center;
    color: #999;
  }
  
  .email {
    word-break: break-all;
  }
}

.special-requests {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  
  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
    color: #666;
  }
}

.booking-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 10px;
  
  .create-time {
    font-size: 0.8rem;
    color: #999;
  }
}

::v-deep .el-dropdown {
  .el-button {
    padding: 4px;
    margin: -4px;
  }
}
</style>