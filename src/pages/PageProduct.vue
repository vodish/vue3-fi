<script setup lang="ts">
import { ref } from 'vue';

const productList = ref([
  {name: 'Продукт-1', id: 1, descr: 'descr', price: 'диапазон'},
  {name: 'Продукт-2', id: 2, descr: 'descr', price: 'диапазон'},
  {name: 'Продукт-3', id: 3, descr: 'descr', price: 'диапазон'},
])

function handleDelete(id: number) {
  alert(`Удалить ${id}`)
}
</script>

<template>
  <h2>Изделия <RouterLink class="btn" to="/product/add">Добавить</RouterLink></h2>

  <ul>
    <li class="li" v-for="(p, i) in productList" :key="p.id+i">
      <div class="id">{{ p.id }}</div>
      <div class="name">{{ p.name }}</div>
      <div class="descr">{{ p.descr }}</div>
      <div class="price">{{ p.price }}</div>
      <div class="options">
        <RouterLink class="btn" :to="'/product/' + p.id">Изменить</RouterLink>
        <span class="btn del" @click="()=>handleDelete(p.id)">Удалить</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>

</style>