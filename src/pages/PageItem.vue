<script setup lang="ts">
import { ref } from 'vue';

const itemList = ref([
  { name: 'Материал-1', id: 1, descr: 'descr', price: 'диапазон' },
  { name: 'Материал-2', id: 2, descr: 'descr', price: 'диапазон' },
  { name: 'Материал-3', id: 3, descr: 'descr', price: 'диапазон цен' },
])

function handleDelete(id: number) {
  alert(`Удалить ${id}`)
}
</script>

<template>
  <ul>
    <li class="li" v-for="(p, i) in itemList" :key="p.id + i">
      <div class="row">
        <div class="name">{{ p.name }}</div>
        <div class="info">
          <div class="id">id: {{ p.id }}</div>
          <div class="descr">{{ p.descr }}</div>
          <div class="price">{{ p.price }}</div>
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
  border-left: solid 1px #ccc;
  padding: 0.5em 1ch;
  margin-bottom: 2em;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
ul > li:hover {
  background-color: #eee;
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