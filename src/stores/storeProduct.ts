import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TItem } from './storeItems'

type TProduct = {
  id: number | 'add'
  name: string
  image: string
  trashAt: Date | null
  top: TItem[]
  mid: TItem[]
  bot: TItem[]
}

export const useStoreProducts = defineStore('products', () => {
  const list = ref<TProduct[]>([
    {
      id: 1,
      name: 'Изделие-1',
      image: '',
      trashAt: null,
      top: [],
      mid: [],
      bot: [],
    },
    {
      id: 2,
      name: 'Изделие-2',
      image: '',
      trashAt: null,
      top: [],
      mid: [],
      bot: [],
    },

  ])


  const row: TProduct = {
    id: 'add',
    name: 'Изделие-2',
    image: '',
    trashAt: null,
    top: [],
    mid: [],
    bot: [],
  }


  return { list, row }
})
