import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

type TItem = {
  id: number | 'add'
  name: string
  descr: string
  unit: string
  price: number
  target: 'top' | 'mid' | 'bot'
  image: string
  trashAt: Date | null
}

export const useStoreItems = defineStore('items', () => {
  // const roure = useRoute()
  const list = ref<TItem[]>([
    {
      id: 1,
      name: 'Материал 1',
      descr: 'материал описания 1',
      unit: 'м',
      price: 1,
      target: 'top',
      image: '',
      trashAt: null,
    },
    {
      id: 2,
      name: 'Материал 2',
      descr: 'материал описания 2',
      unit: 'м',
      price: 1,
      target: 'top',
      image: '',
      trashAt: null,
    },
    
  ])

  const row: TItem = {
    id: 'add',
    name: 'Новый материал',
    descr: '',
    unit: '',
    price: 1,
    target: 'bot',
    image: '',
    trashAt: null,
  }


  return { list, row }
})
