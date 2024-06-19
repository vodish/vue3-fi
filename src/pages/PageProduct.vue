<script setup lang="ts">
import { useStoreProducts } from '@/stores/storeProduct';

const products = useStoreProducts()

function handleDelete(id: number | 'add') {
  alert(`Удалить ${id}`)
}
</script>

<template>
  <ul>
    <li class="li" v-for="(p) in products.list" :key="p.id">
      <div class="row">
        <div class="name"><RouterLink :to="$route.path + '/' + p.id">{{ p.name }}</RouterLink></div>
        <div class="list">
          <div class="top">top: {{ p.top }}</div>
          <div class="mid">mid: {{ p.mid }}</div>
          <div class="bot">bot: {{ p.bot }}</div>
        </div>
      </div>
      <div class="options">
        <RouterLink class="btn" :to="$route.path + '/' + p.id">Изменить</RouterLink>
        <span class="btn del" @click="() => handleDelete(p.id)">Удалить</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
ul > li {
  border: solid 1px transparent;
  border-left-color: #ccc;
  padding: 0.5em 1ch;
  margin-bottom: 2em;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
ul > li:hover {
  border-color: #ccc;
}

.row .name {
  font-size: 1.4em;
  margin-bottom: 0.3em;
 }
.row .info {
  display: flex;
  gap: 1em;
}
</style>