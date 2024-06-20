import type { TItem } from "@/stores/storeItems"

export let API_URL = 'https://api.vue3-fi.karasev.ru'
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'X-Auth': 'sdvsd',
}

if (/localhost/.test(window.location.host)) {
  API_URL = 'http://vue3-fi.backend'
}


export async function itemGetAll() {
  const res = await fetch(`${API_URL}/item/getAll`)
  const json = await res.json()

  return json || []
}

export async function itemSave(data: TItem) {

  const res = await fetch(`${API_URL}/item/save`, {
    method: 'POST',
    headers: {
      ...API_HEADERS
    },
    body: JSON.stringify(data)
  })
  const json = await res.json() as TItem[]
  
  return json || []
}
