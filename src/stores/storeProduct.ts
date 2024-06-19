import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TItem } from './storeItems'

export type TProduct = {
  id: number | 'add'
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
      top: [2,1],
      mid: [3,3],
      bot: [],
      prices: [
        {top: 1, mid: 3, price: 333},
        {top: 1, mid: 3, price: 123},
        {top: 1, mid: 3, price: 566},
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
