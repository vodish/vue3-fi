<script setup lang="ts">
import { useStoreItems } from '@/stores/storeItems'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const items = useStoreItems()

const row = computed(() => {
  if (route.params.id === 'add') return items.newrow;

  const row = items.list.filter(el => Number(route.params.id) === el.id)

  return row[0];
})


async function handleSave() {
  if (row.value.id === 'add') {
    await items.saveRow({ ...row.value }, 'insert')
    const lastId = items.list[items.list.length - 1].id
    router.push({ path: `/item/${lastId}` })
    alert('Добавлено');
  }
  else {
    items.saveRow({ ...row.value }, 'update')
    alert('Сохранено');
  }

}


function handleDelete() {
  if (confirm('Удалить материал?')) {
    items.saveRow({ ...row.value }, 'delete')
  }
}

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
      <div class="fld">Картинка (<span
          @click="row.image = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70)"
          style="cursor: pointer;">пример</span>)</div>
      <div class="val"><input type="text" v-model="row.image" /></div>
    </div>
    <div class="image" v-if="row.image">
      <img :src="row.image" />
    </div>

    <div class="submit">
      <span class="btn save" @click="handleSave">Сохранить</span>
    </div>
    <div class="submit">
      <span class="btn save" @click="handleDelete">Удалить</span>
    </div>
  </form>
  <div v-else>
    Материал удален.
  </div>
</template>

<style scoped>
h2 {
  min-height: 2em;
}
</style>
