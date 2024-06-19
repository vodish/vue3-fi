<script setup lang="ts">
import { useStoreItems } from '@/stores/storeItems';
import { computed, ref } from 'vue';

const props = defineProps<{
  head: string
  target: 'top' | 'mid' | 'bot'
  selected: number[]
}>()


const items = useStoreItems()
const list = computed(() => items[props.target])

const show = ref(false)

const sels = computed(() => {
  return props.selected.map(id => {
    const key = items.keys.findIndex(el => el === id)
    return items.list[key]
  })
})



function handleAdd(id: number) {
  props.selected.push(id)
}

function handleDel(key: number) {
  props.selected.splice(key, 1);
}

</script>

<template>
  <div class="list">
    <div class="head" @click="show = !show">
      <span>{{ props.head }}</span>
      <span>Выбрать</span>
    </div>
    <div class="li store" v-if="show">
      <div class="thead">
        <div class="id">ID</div>
        <div class="name">Название</div>
        <div class="select"></div>
      </div>
      <div class="tr" v-for="el in list">
        <div class="id">{{ el.id }}</div>
        <div class="name">{{ el.name }}</div>
        <div class="select"><span class="btn" @click="handleAdd(el.id as number)">Добавить</span></div>
      </div>
    </div>
    <div class="li selected">
      <div class="tr" v-for="(el, k) in sels">
        <div class="id">{{ el.id }}</div>
        <div class="name">{{ el.name }}</div>
        <div class="select"><span class="btn" @click="handleDel(k)">Удалить</span></div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.list > .head {
  border-bottom: dotted 1px #ccc;
  padding: 10px 10px 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  cursor: pointer;
}

.list > .head > span:first-child {
  font-size: 18px;
}

.li.store {
  padding-bottom: 1em;
  border-bottom: solid 1px #ccc;
}



.li > div {
  display: flex;
  padding: 2px 10px;
  border: solid 1px transparent;
}

.li > .tr:hover {
  border-color: #ccc !important;
}

.li > div .id {
  flex-basis: 4ch;
}
.li > div .name {
  flex-basis: 40%;
  flex-grow: 1;
}
.li > div .select {
  flex-basis: 10%;
}

.li.selected {
  margin-top: 1em;
}
</style>