<script setup lang="ts">
import { useStoreProducts } from '@/stores/storeProduct';

const products = useStoreProducts()

function handleDelete(id: number, name: string) {
  if ( confirm(`Удалить ${name}`) ) {
    products.apiDelete(id)
  }
}
</script>

<template>
  <ul>
    <li class="li" v-for="(p) in products.list" :key="p.id">
      <div class="row">
        <div class="name"><RouterLink :to="$route.path + '/' + p.id">{{ p.name }}</RouterLink></div>
        <div class="descr">{{ p.descr }}</div>
        <div class="price">price: ....</div>
        <div class="items">
          <span class="top">top: {{ p.top }}</span>
          <span class="mid">mid: {{ p.mid }}</span>
          <span class="bot">bot: {{ p.bot }}</span>
        </div>
      </div>
      <div class="options">
        <RouterLink class="btn" :to="$route.path + '/' + p.id">Изменить</RouterLink>
        <span class="btn del" @click="() => handleDelete(p.id, p.name)">Удалить</span>
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
.row .items {
  display: flex;
  gap: 2ch;
}
</style>