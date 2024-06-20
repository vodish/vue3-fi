import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { API_URL, API_HEADERS } from '@/utils/api'

export type TRowId = number | 'add'

export type TItem = {
  id: TRowId
  name: string
  descr: string
  unit: string
  price: number
  target: 'top' | 'mid' | 'bot'
  image: string
  trashAt: Date | null
}

export const useStoreItems = defineStore('items', () => {
  const list = ref<TItem[]>([]);

  async function itemGetAll() {
    const res = await fetch(`${API_URL}/item/getAll`)
    const json = await res.json()
    
    list.value =  json || []
  }

  itemGetAll()



  const keys = computed(() => {
    const map1 = new Map
    list.value.map((el, i) => map1.set(el.id, i))
    return map1
  })

  const top = computed(() => list.value.filter(el => el.target === 'top'))
  const mid = computed(() => list.value.filter(el => el.target === 'mid'))
  const bot = computed(() => list.value.filter(el => el.target === 'bot'))


  const newrow: TItem = {
    id: 'add',
    name: 'Новый материал',
    descr: '',
    unit: '',
    price: 1,
    target: 'bot',
    image: '',
    trashAt: null,
  }


  async function saveRow(data: object, action: 'insert' | 'update' | 'delete' = 'insert') {
    const res = await fetch(`${API_URL}/item/save`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({ ...data, action: action })
    })
    const json = await res.json() as TItem[]

    list.value = json || [];
  }


  return { list, keys, top, mid, bot, newrow, saveRow }
})
