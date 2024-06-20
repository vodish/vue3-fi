import type { TItem } from "@/stores/storeItems"

const API_URL = 'http://vue3-fi.backend'

export async function itemGetAll() {
  const res = await fetch(`${API_URL}/item/getAll`)
  const data = await res.json()
  // console.log(data)
  return data || []
}