import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TRowId } from './storeItems'
import { apiRequest } from '@/utils/api'

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

  const list = ref<TProduct[]>([])
  apiRequest<TProduct[]>('/product/getAll').then(res => list.value = res)

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

  
  function apiInsert(data: object) {
    alert('apiInsert')
    apiRequest<TProduct[]>('/product/insert', data).then(res => list.value = res)
  }

  function apiUpdate(data: object) {
    alert('apiUpdate')
    apiRequest<TProduct[]>('/product/update', data).then(res => list.value = res)
  }

  function apiDelete(id: number) {
    alert('apiDelete')
    apiRequest<TProduct[]>('/product/delete', { id }).then(res => list.value = res)
  }



  return { list, newrow, apiInsert, apiUpdate, apiDelete }
})
