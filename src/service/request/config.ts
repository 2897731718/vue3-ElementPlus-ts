let BASE_URL = ''
const TIME_OUT = 10000
// 配置不同环境下面的 BASE_URL
if (import.meta.env.MODE === 'development') {
  BASE_URL = '/api'
} else if (import.meta.env.MODE === 'production') {
  BASE_URL = ''
} else {
  BASE_URL = ''
}

export { BASE_URL, TIME_OUT }
