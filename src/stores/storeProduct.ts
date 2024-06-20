import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TRowId } from './storeItems'
import { API_HEADERS, API_URL } from '@/utils/api'

export type TProduct = {
  id: TRowId
  name: string
  descr: string
  image: string
  trashAt: Date | null
  top: number[]
  mid: number[]
  bot: number[]
  prices: TProductPrice[]
}

export type TProductPrice = {
  uid: string
  top: number
  mid: number
  price: number
}


export const useStoreProducts = defineStore('products', () => {
  const list = ref<TProduct[]>([
    {
      id: 1,
      name: 'Изделие-1',
      descr: 'Изделие-1',
      image: '',
      trashAt: null,
      top: [],
      mid: [],
      bot: [],
      prices: [
        // {uid: '2_3', top: 2, mid: 3, price: 333},
        // {uid: '1_3', top: 1, mid: 3, price: 123},
      ],
    },
    {
      id: 2,
      name: 'Изделие-2',
      descr: 'Изделие-2',
      image: '',
      trashAt: null,
      top: [],
      mid: [],
      bot: [],
      prices: [],
    },

  ])


  const newrow: TProduct = {
    id: 'add',
    name: 'Новое изделие',
    descr: '',
    image: '',
    trashAt: null,
    top: [],
    mid: [],
    bot: [],
    prices: [],
  }



  async function saveRow(data: object, action: 'insert' | 'update' | 'delete' = 'insert') {
    const res = await fetch(`${API_URL}/product/save`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify({ ...data, action: action })
    })
    const json = await res.json() as TProduct[]

    list.value = json || [];
  }



  return { list, newrow, saveRow }
})
