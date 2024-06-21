import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { API_URL, API_HEADERS, apiRequest } from '@/utils/api'


export type TItem = {
  id: number
  name: string
  descr: string
  unit: string
  price: number
  target: 'top' | 'mid' | 'bot'
  image: string
  trashAt: Date | null
  deleted?: boolean
}

export const useStoreItems = defineStore('items', () => {
  const list = ref<TItem[]>([]);

  apiRequest<TItem[]>('/item/getAll').then(res => list.value = res)




  const keys = computed(() => {
    const map1 = new Map
    list.value.map((el, i) => map1.set(el.id, i))
    return map1
  })

  const top = computed(() => list.value.filter(el => el.target === 'top'))
  const mid = computed(() => list.value.filter(el => el.target === 'mid'))
  const bot = computed(() => list.value.filter(el => el.target === 'bot'))


  const newrow: TItem = {
    id: -1,
    name: 'Новый материал',
    descr: '',
    unit: '',
    price: 1,
    target: 'bot',
    image: '',
    trashAt: null,
  }



  async function apiInsert(row: TItem) {
    await apiRequest<TItem[]>('/item/insert', row).then(res => list.value = res)

    return list.value[list.value.length - 1].id
  }

  function apiUpdate(row: TItem) {
    apiRequest<TItem[]>('/item/update', row).then(res => list.value = res)
  }

  function apiDelete(id: number) {
    apiRequest<TItem[]>('/item/delete', { id }).then(res => list.value = res)
  }


  return {
    list, keys, top, mid, bot, newrow,
    apiInsert, apiUpdate, apiDelete,
  }
})
