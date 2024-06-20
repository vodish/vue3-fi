
export let API_URL = 'https://api.vue3-fi.karasev.ru'
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'X-Auth': 'sdvsd',
}

if (/localhost/.test(window.location.host)) {
  API_URL = 'http://vue3-fi.backend'
}
