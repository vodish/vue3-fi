<script setup lang="ts">
import { useStoreItems, type TRowId } from '@/stores/storeItems';
import { useStoreProducts } from '@/stores/storeProduct';
import { computed, ref } from 'vue';

const props = defineProps<{
  head: string
  target: 'top' | 'mid' | 'bot'
  selected: number[]
}>()


const products = useStoreProducts()
const items = useStoreItems()
const list = computed(() => items[props.target])
const open = ref(false)



function isEmpty(id: TRowId) {
  return props.selected.indexOf(id as number) < 0
}

function handleAdd(id: number) {
  products.addItem(props.target, id)
  // open.value = false
}

function handleDel(id: number) {
  products.delItem(props.target, id)
  // open.value = false
}

</script>

<template>
  <div class="list">
    <div class="head" @click="open = !open">
      <span>{{ props.head }}</span>
      <span v-if="!open">Развернуть</span>
      <span v-else>Свернуть</span>
    </div>
    <div class="li store">
      <div class="thead" v-if="open">
        <div class="id">ID</div>
        <div class="name">Название</div>
        <div class="select"></div>
      </div>
      <template v-for="el in list" :key="el.id">
        <div class="tr" v-if="open || !isEmpty(el.id)">
          <div class="id">{{ el.id }}</div>
          <div class="name">{{ el.name }}</div>
          <div class="select" v-if="open">
            <span class="btn" @click="handleAdd(el.id as number)" v-if="isEmpty(el.id)">Добавить</span>
            <span class="btn" @click="handleDel(el.id as number)" v-else>Удалить</span>
          </div>
        </div>
      </template>

    </div>

  </div>
</template>



<style scoped>
.list > .head {
  border-bottom: dotted 1px #ccc;
  margin-bottom: 0.5em;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  cursor: pointer;
}

.list > .head > span:first-child {
  font-size: 1.2em;
}

.li.store {
  padding-bottom: 1em;
}



.li > div {
  display: flex;
  padding: 4px 0;
}

.li > .tr {
  border-bottom: dotted 1px #333;
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