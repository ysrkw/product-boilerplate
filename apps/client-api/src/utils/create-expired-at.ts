export function createExpiredAt() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000)
}
