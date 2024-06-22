import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '@/utils/api'

export type TProduct = {
  id: number
  name: string
  descr: string
  image: string
  trashAt: Date | null
  top: number[]
  mid: number[]
  bot: number[]
  price_range: string
  prices: TProductPrice[]
  deleted?: boolean
}

export type TProductPrice = {
  uid: string
  top: number
  mid: number
  price: number
}



export const useStoreProducts = defineStore('products', () => {
  const list = ref<TProduct[]>([])
  apiRequest<TProduct[]>('/product/getAll').then(res => list.value = res)

  const addrow: TProduct = {
    id: -1,
    name: 'Новое изделие',
    descr: '',
    image: '',
    trashAt: null,
    top: [],
    mid: [],
    bot: [],
    price_range: '',
    prices: [],
  }

  const row = ref<TProduct>(addrow)


  function setRow(id: string) {
    if (id === 'add') {
      row.value = addrow
    }

    const find = list.value.find(el => el.id === Number(id))
    if (find) row.value = find

    setPrices()
  }


  function setPrices() {
    const newPices: TProductPrice[] = []

    row.value.top.map(top => {
      row.value.mid.map(mid => {
        const uid = `${top},${mid}`
        const price = row.value?.prices.filter(el => el.uid === uid)[0]?.price || 0
        newPices.push({ uid, top, mid, price })
      })
    })

    return row.value.prices = newPices
  }



  function addItem(target: 'top' | 'mid' | 'bot', id: number) {
    row.value[target].push(id)
    setPrices()
  }
  function delItem(target: 'top' | 'mid' | 'bot', id: number) {
    row.value[target] = row.value[target].filter(el => el !== id)
    setPrices()
  }



  async function apiInsert() {
    await apiRequest<TProduct[]>('/product/insert', row.value).then(res => list.value = res)
    
    return list.value[list.value.length - 1].id
  }

  function apiUpdate() {
    apiRequest<TProduct[]>('/product/update', row.value).then(res => list.value = res)
  }

  function apiDelete(id: number) {
    apiRequest<TProduct[]>('/product/delete', { id }).then(res => list.value = res)
    row.value.deleted = true
  }



  return {
    list, row,
    setRow, setPrices, addItem, delItem, apiInsert, apiUpdate, apiDelete,
  }
})
