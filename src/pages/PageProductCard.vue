<script setup lang="ts">
import { ref } from 'vue';

const productList = ref([
  {name: 'Продукт-1', id: 1, descr: 'descr', price: 'диапазон'},
  {name: 'Продукт-2', id: 2, descr: 'descr', price: 'диапазон'},
  {name: 'Продукт-3', id: 3, descr: 'descr', price: 'диапазон'},
])
</script>

<template>
  <h2>Изделия <button>Добавить</button></h2>

  <ul>
    <li class="li" v-for="(p, i) in productList" :key="p.id+i">
      <div class="id">{{ p.id }}</div>
      <div class="name">{{ p.name }}</div>
      <div class="descr">{{ p.descr }}</div>
      <div class="price">{{ p.price }}</div>
      <div class="options">
        <button>Удалить</button>
        <button>Изменить</button>
      </div>
    </li>
  </ul>

  уникальный номер,
название,
описание,
диапазон стоимости,
кнопки редактировать изделие,
удалить изделие.
</template>
