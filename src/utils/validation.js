export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateBooking = (booking) => {
  const errors = {}
  
  if (!booking.guestName || booking.guestName.trim() === '') {
    errors.guestName = 'The guest name is a required field'
  } else if (booking.guestName.length > 100) {
    errors.guestName = 'The guest name cannot exceed 100 characters'
  }
  
  if (!booking.phone || booking.phone.trim() === '') {
    errors.phone = 'Phone number is a required field'
  } else if (!validatePhone(booking.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  if (!booking.email || booking.email.trim() === '') {
    errors.email = 'Email address is a required field'
  } else if (!validateEmail(booking.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!booking.arrivalTime) {
    errors.arrivalTime = 'Arrival time is a required field'
  } else if (new Date(booking.arrivalTime) <= new Date()) {
    errors.arrivalTime = 'The arrival time must be in the future'
  }
  
  if (!booking.partySize || booking.partySize < 1) {
    errors.partySize = 'The number of diners is required'
  } else if (booking.partySize > 20) {
    errors.partySize = 'The number of diners cannot exceed 20 people'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}