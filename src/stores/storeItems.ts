import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

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
  const list = ref<TItem[]>([
    {
      id: 1,
      name: 'Материал 1',
      descr: 'материал описания 1',
      unit: 'м',
      price: 10,
      target: 'top',
      image: '',
      trashAt: null,
    },
    {
      id: 2,
      name: 'Материал 2',
      descr: 'материал описания 2',
      unit: 'м',
      price: 20,
      target: 'top',
      image: '',
      trashAt: null,
    },
    {
      id: 3,
      name: 'Материал 3',
      descr: 'материал описания 3',
      unit: 'м',
      price: 30,
      target: 'mid',
      image: '',
      trashAt: null,
    },
  ])


  const keys = computed(() => {
    const map1 = new Map
    list.value.map((el, i) => map1.set(el.id, i) )
    return map1
  })

  const top = computed(() => list.value.filter(el => el.target === 'top'))
  const mid = computed(() => list.value.filter(el => el.target === 'mid'))
  const bot = computed(() => list.value.filter(el => el.target === 'bot'))


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


  return { list, keys, top, mid, bot, row }
})
