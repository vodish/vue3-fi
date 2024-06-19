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
      descr: 'материал описания',
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

  // const row = computed( () => {
  //   if ( !roure.params.id ) return undefined;

  //   const filter = list.value.filter((el, i) => {
  //     if (Number(roure.params.id) === el.id) {
  //       return { ...el, key: i }
  //     }
  //   })

  //   return filter[0];
  // })



  return { list, row }
})
