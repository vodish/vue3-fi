<script setup lang="ts">
import { useStoreItems } from '@/stores/storeItems';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const items = useStoreItems()

const row = computed(() => {
  if (route.params.id === 'add') return items.row;

  const filter = items.list.filter(el => {
    return Number(route.params.id) === el.id
  })

  return filter[0] || items.row;
})

</script>

<template>
  <form class="card" v-if="row">
    <h2>{{ row.name }}</h2>

    <div class="row">
      <div class="fld">Название</div>
      <div class="val"><input type="text" v-model="row.name" /></div>
    </div>
    <div class="row">
      <div class="fld">описание</div>
      <div class="val"><textarea class="descr" v-model="row.descr"></textarea></div>
    </div>
    <div class="row">
      <div class="fld">Ед. измерения</div>
      <div class="val"><input type="text" v-model="row.unit" style="width: 15ch;" /></div>
    </div>
    <div class="row">
      <div class="fld">price</div>
      <div class="val"><input class="price" type="text" v-model="row.price" /></div>
    </div>
    <div class="row">
      <div class="fld">target</div>
      <div class="val">
        <label> <input type="radio" id="one" value="top" v-model="row.target" /> Верх </label>
        <label> <input type="radio" id="one" value="mid" v-model="row.target" /> Cередина </label>
        <label><input type="radio" id="one" value="bot" v-model="row.target" /> Низ </label>
      </div>
    </div>
    <div class="row">
      <div class="fld">Картинка  (<span @click="row.image = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 20)" style="cursor: pointer;">пример</span>)</div>
      <div class="val"><input type="text" v-model="row.image" /></div>
    </div>
    <div class="image" v-if="row.image">
      <img :src="row.image" />
    </div>

    <div class="submit">
      <span class="btn save">Сохранить</span>
    </div>
  </form>

</template>
