import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TItem } from './storeItems'

export type TProduct = {
  id: number | 'add'
  name: string
  descr: string
  image: string
  trashAt: Date | null
  top: TItem[]
  mid: TItem[]
  bot: TItem[]
  prices: TProductPrice[]
}

export type TProductPrice = {
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
      prices: [],
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


  const row: TProduct = {
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


  return { list, row }
})
