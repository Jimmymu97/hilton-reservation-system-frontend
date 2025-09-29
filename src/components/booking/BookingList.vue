<template>
  <div class="booking-list">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="3" animated />
    </div>
    
    <div v-else-if="bookings.length === 0" class="empty-state">
      <el-empty description="No bookings found" />
    </div>
    
    <div v-else class="bookings-grid">
      <BookingCard
        v-for="booking in bookings"
        :key="booking.id || booking._id"
        :booking="booking"
        @status-change="$emit('status-change', $event)"
        @refresh="$emit('refresh')"
      />
    </div>
  </div>
</template>

<script>
import BookingCard from './BookingCard.vue'

export default {
  name: 'BookingList',
  components: {
    BookingCard
  },
  props: {
    bookings: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['status-change', 'refresh']
}
</script>

<style lang="scss" scoped>
.booking-list {
  .bookings-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
  
  .loading-container {
    padding: 20px;
  }
  
  .empty-state {
    padding: 40px 0;
  }
}

@media (max-width: 768px) {
  .booking-list .bookings-grid {
    grid-template-columns: 1fr;
  }
}
</style>