
export let API_URL = 'https://api.vue3-fi.karasev.ru'
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'X-Auth': 'superAuth',
}

if (/localhost/.test(window.location.host)) {
  API_URL = 'http://vue3-fi.backend'
}

export async function apiRequest<T>(url: string, data?: object) {
  const res = await fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: API_HEADERS,
    body: data ? JSON.stringify(data) : undefined
  })
  const json = await res.json()

  return json as T || []
}


export async function apiUpload(fileList: FileList | null) {
  if (!fileList) return;
  
  const fd = new FormData()
  fd.append('file', fileList[0])

  const res = await fetch(`${API_URL}/attach/upload`, {
    method: 'POST',
    headers: { 'X-Auth': API_HEADERS['X-Auth'] },
    body: fd
  })

  const json = await res.json() as {url: string}
  
  return json.url
}

