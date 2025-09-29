import dayjs from 'dayjs'

export const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const formatTime = (date) => {
  return dayjs(date).format('HH:mm')
}

export const formatDateTime = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export const formatDateTimeDetailed = (date) => {
  return dayjs(date).format('MMM D, YYYY h:mm A')
}

export const isToday = (date) => {
  return dayjs(date).isSame(dayjs(), 'day')
}

export const isFuture = (date) => {
  return dayjs(date).isAfter(dayjs())
}

export const getRelativeTime = (date) => {
  const now = dayjs()
  const target = dayjs(date)
  const diffMinutes = now.diff(target, 'minute')
  const diffHours = now.diff(target, 'hour')
  const diffDays = now.diff(target, 'day')

  if (diffMinutes < 1) return 'Just Now'
  if (diffMinutes < 60) return `${diffMinutes}minutes ago`
  if (diffHours < 24) return `${diffHours}hours ago`
  if (diffDays < 7) return `${diffDays}days ago`
  
  return formatDate(date)
}

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatDateTimeDetailed,
  isToday,
  isFuture,
  getRelativeTime
}