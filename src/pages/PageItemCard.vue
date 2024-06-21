<script setup lang="ts">
import { useStoreItems } from '@/stores/storeItems'
import { apiUpload } from '@/utils/api';
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const items = useStoreItems()

const row = computed(() => {
  if (route.params.id === 'add') return items.newrow;

  const row = items.list.find(el => Number(route.params.id) === el.id)

  return row || items.newrow;
})



async function handleInsert() {
  const lastId = await items.apiInsert(row.value)
  router.push({ path: `/item/${lastId}` })
  alert('Добавлено');
}


function handleUpdate() {
  items.apiUpdate(row.value)
  alert('Обновлено');
}


function handleDelete() {
  if (confirm('Удалить материал?')) {
    items.apiDelete(row.value.id)
    row.value.deleted = true
  }
}


async function handleUpload(e: Event) {
  const url = await apiUpload((e.target as HTMLInputElement).files)
  row.value.image = url || ''
}

</script>

<template>
  <div v-if="row.deleted">
    Материал удален.
  </div>

  <form class="card" v-else>
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
      <div class="val upload">
        <input type="text" v-model="row.image" />
        <input type="file" accept=".jpeg,.jpg,.png" @change="handleUpload" />
      </div>
    </div>
    <div class="image" v-if="row.image">
      <img :src="row.image" />
    </div>

    <div class="submit" v-if="row.id < 0">
      <span class="btn save" @click="handleInsert">Добавить</span>
    </div>
    <div class="submit" v-else>
      <span class="btn save" @click="handleUpdate">Изменить</span>
      <br /><br />
      <span class="btn save" @click="handleDelete">Удалить</span>
    </div>
  </form>

</template>

<style scoped>
h2 {
  min-height: 2em;
}
</style>
