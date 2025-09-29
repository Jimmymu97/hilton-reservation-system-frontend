<template>
  <el-form 
    ref="bookingForm" 
    :model="form" 
    :rules="rules" 
    label-width="120px"
    class="booking-form"
    @submit.native.prevent="handleSubmit"
  >
    <el-alert
      v-if="submitError"
      :title="submitError"
      type="error"
      show-icon
      :closable="false"
      class="error-alert"
    />

    <h3 class="form-section-title">Guest Information</h3>
    
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Guest Name" prop="guestName">
          <el-input 
            v-model="form.guestName" 
            placeholder="Please enter guest name"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>
      </el-col>
      
      <el-col :span="12">
        <el-form-item label="Phone Number" prop="phone">
          <el-input 
            v-model="form.phone" 
            placeholder="Please enter your phone number"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="Email Address" prop="email">
      <el-input 
        v-model="form.email" 
        type="email"
        placeholder="Please enter your email address"
      />
    </el-form-item>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Arrival Time" prop="arrivalTime">
          <el-date-picker
            v-model="form.arrivalTime"
            type="datetime"
            placeholder="Select arrival date and time"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-ddTHH:mm:ss.000Z"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      
      <el-col :span="12">
        <el-form-item label="Party Size" prop="partySize">
          <el-select v-model="form.partySize" placeholder="Select number of people" style="width: 100%">
            <el-option
              v-for="size in partySizes"
              :key="size"
              :label="`${size} ${size === 1 ? 'person' : 'people'}`"
              :value="size"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item label="Special Requests" prop="specialRequests">
      <el-input
        v-model="form.specialRequests"
        type="textarea"
        :rows="3"
        placeholder="Any dietary restrictions or special requests..."
        maxlength="500"
        show-word-limit
      />
    </el-form-item>

    <el-form-item>
      <el-button 
        type="primary" 
        :loading="isSubmitting" 
        native-type="submit"
        class="submit-button"
      >
        {{ isSubmitting ? 'Submitting...' : 'Book Now' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validateBooking } from '@/utils/validation'

export default {
  name: 'BookingForm',
  props: {
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // Custom validation rules
    const validateArrivalTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please select the arrival time'))
      } else if (new Date(value) <= new Date()) {
        callback(new Error('The arrival time must be in the future'))
      } else {
        callback()
      }
    }

    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your phone number'))
      } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
        callback(new Error('Please enter a valid phone number'))
      } else {
        callback()
      }
    }

    return {
      isSubmitting: false,
      submitError: '',
      form: {
        guestName: this.initialData.guestName || '',
        phone: this.initialData.phone || '',
        email: this.initialData.email || '',
        arrivalTime: this.initialData.arrivalTime || this.getDefaultArrivalTime(),
        partySize: this.initialData.partySize || 2,
        specialRequests: this.initialData.specialRequests || ''
      },
      rules: {
        guestName: [
          { required: true, message: 'Please enter the guest name', trigger: 'blur' },
          { min: 1, max: 100, message: 'Name length should be between 1 to 100 characters', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please enter your email address', trigger: 'blur' },
          { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' }
        ],
        arrivalTime: [
          { required: true, validator: validateArrivalTime, trigger: 'change' }
        ],
        partySize: [
          { required: true, message: 'Please select party size', trigger: 'change' }
        ]
      },
      partySizes: Array.from({ length: 20 }, (_, i) => i + 1),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 // Disable past dates
        },
        shortcuts: [{
          text: '1 hour later',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000)
            picker.$emit('pick', date)
          }
        }, {
          text: 'Same time tomorrow',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    getDefaultArrivalTime() {
      const date = new Date()
      date.setHours(date.getHours() + 1)
      return date.toISOString()
    },

    async handleSubmit() {
      this.submitError = ''
      
      try {
        // Validate form
        await this.$refs.bookingForm.validate()
        
        this.isSubmitting = true
        
        // Call API to create booking
        await this.$store.dispatch('bookings/createBooking', this.form)
        
        // Emit success event
        this.$emit('booking-created')
        
        // Reset form
        this.$refs.bookingForm.resetFields()
        this.form.arrivalTime = this.getDefaultArrivalTime()
        this.form.partySize = 2
        this.form.specialRequests = ''
        
      } catch (error) {
        if (error instanceof Error) {
          this.submitError = error.message || 'Submission failed, please try again'
        } else {
          // Element UI validation error
          console.log('Form validation error')
        }
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.booking-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.error-alert {
  margin-bottom: 20px;
}

.form-section-title {
  color: #1a3a6c;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f2f5;
}

.submit-button {
  width: 200px;
  height: 45px;
  font-size: 16px;
}

::v-deep .el-form-item__label {
  font-weight: 500;
}
</style>