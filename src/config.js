export default {
  RESEND_TIMEOUT: 45,
  RAZORPAY_KEY: window.GlobalConfig?.RZP_KEY || '',
  BASE_URL: process.env.FRONTEND_ONLY
    ? 'https://testing.rytt.com/'
    : 'https://testing.rytt.com/',
  BRANDING: 'rytt' // 'ap' | 'rytt'
}
